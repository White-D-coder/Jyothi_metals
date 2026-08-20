import numpy as np
from PIL import Image, ImageFilter

W, H = 1400, 1000
BRAND = (52, 129, 131)

def grids(w=W, h=H):
    y, x = np.mgrid[0:h, 0:w].astype(np.float64)
    return x, y

def ss(e0, e1, t):
    """smoothstep -> analytic antialiasing"""
    t = np.clip((t - e0) / max(e1 - e0, 1e-9), 0.0, 1.0)
    return t * t * (3 - 2 * t)

def band(r, r0, r1, aa=1.2):
    """soft-edged annulus mask"""
    return ss(r0 - aa, r0 + aa, r) * (1.0 - ss(r1 - aa, r1 + aa, r))

def bg(w=W, h=H, tone=(232, 234, 237)):
    """studio sweep: soft light from upper area, gentle vignette"""
    x, y = grids(w, h)
    cx, cy = w * 0.5, h * 0.34
    d = np.sqrt(((x - cx) / (w * 0.78)) ** 2 + ((y - cy) / (h * 0.95)) ** 2)
    lum = 1.06 - 0.30 * np.clip(d, 0, 1.6) ** 1.5
    base = np.array(tone, np.float64)[None, None, :]
    img = base * lum[..., None]
    img += (np.random.default_rng(7).normal(0, 1.5, (h, w, 1)))
    return np.clip(img, 0, 255)

def over(dst, color, alpha):
    """alpha-composite color (h,w,3 array or rgb tuple) onto dst"""
    a = alpha[..., None]
    c = color if isinstance(color, np.ndarray) and color.ndim == 3 else np.array(color, np.float64)[None, None, :]
    return dst * (1 - a) + c * a

def shadow(dst, mask, dx=10, dy=18, blur=22, strength=0.42):
    m = Image.fromarray((np.clip(mask, 0, 1) * 255).astype(np.uint8))
    m = m.filter(ImageFilter.GaussianBlur(blur))
    a = np.array(m, np.float64) / 255.0
    a = np.roll(np.roll(a, dy, 0), dx, 1) * strength
    return dst * (1 - a[..., None])

def metal(r, theta, base, lx=-0.55, ly=-0.62, aniso=0.16, seed=3, rough=3.0):
    """directional + anisotropic shading for turned/rolled metal"""
    h, w = r.shape
    nx, ny = np.cos(theta), np.sin(theta)
    lam = 1.0 + 0.20 * (nx * lx + ny * ly)
    lam += aniso * np.cos(2 * (theta - 0.6))
    lam += rough / 255.0 * np.random.default_rng(seed).normal(0, 1.0, (h, w))
    return np.clip(np.array(base, np.float64)[None, None, :] * lam[..., None], 0, 255)

def polar(x, y, cx, cy):
    dx, dy = x - cx, y - cy
    return np.hypot(dx, dy), np.arctan2(dy, dx)

def save(arr, path, q=92):
    Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8)).save(path, quality=q, subsampling=0)

def watermark(path, logo="public/images/jmi_logo.png", scale=0.085, margin=28, op=0.5):
    im = Image.open(path).convert("RGB")
    lg = Image.open(logo).convert("RGBA")
    s = int(im.width * scale)
    lg = lg.resize((s, s), Image.LANCZOS)
    a = lg.split()[3].point(lambda v: int(v * op))
    lg.putalpha(a)
    im.paste(lg, (im.width - s - margin, im.height - s - margin), lg)
    im.save(path, quality=92, subsampling=0)
