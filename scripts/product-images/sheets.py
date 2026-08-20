import sys, numpy as np
sys.path.insert(0, __import__("os").path.dirname(__file__))
from lib import *

# 3/4 view: unit square (u,v) -> image space
UX, UY = 600.0, 158.0     # width direction (right + slightly down)
VX, VY = -352.0, 226.0    # depth direction (left + down)

def quad_uv(x, y, ox, oy):
    det = UX * VY - VX * UY
    dx, dy = x - ox, y - oy
    u = ( VY * dx - VX * dy) / det
    v = (-UY * dx + UX * dy) / det
    return u, v

def quad_mask(u, v, aa=0.0016):
    return (ss(-aa, aa, u) * (1 - ss(1 - aa, 1 + aa, u)) *
            ss(-aa, aa, v) * (1 - ss(1 - aa, 1 + aa, v)))

def fibre_tex(u, v, base, seed, grain=7.0, streak=0.0, mesh=0.0):
    """material surface: compressed-fibre grain, optional calender streaks / wire mesh"""
    h, w = u.shape
    rng = np.random.default_rng(seed)
    n = rng.normal(0, 1, (h, w))
    n = np.array(Image.fromarray(((n * 40 + 128).clip(0, 255)).astype(np.uint8))
                 .filter(ImageFilter.GaussianBlur(1.1)), np.float64)
    lam = 1.0 + (n - 128) / 128.0 * (grain / 100.0)
    if streak:
        lam += streak * 0.01 * np.sin(u * 190.0 + np.sin(v * 26.0) * 2.2)
    if mesh:
        m = (np.sin(u * 260.0) * np.sin(v * 168.0))
        lam += mesh * 0.01 * np.clip(m * 3.0, -1, 1)
    lam *= 1.0 + 0.10 * (1.0 - v) - 0.06 * u          # light falls off toward the front
    return np.clip(np.array(base, np.float64)[None, None, :] * lam[..., None], 0, 255)

def sheet(path, base, seed=11, layers=6, gap=7, grain=7.0, streak=0.0, mesh=0.0, edge_mul=0.68):
    x, y = grids()
    ox, oy = W * 0.5 - (UX + VX) * 0.5, H * 0.30
    img = bg()

    u0, v0 = quad_uv(x, y, ox, oy)
    bot = quad_mask(*quad_uv(x, y, ox, oy + gap * layers))
    img = shadow(img, bot, dx=10, dy=20, blur=26, strength=0.40)

    # stack of sheets, back to front
    for i in range(layers, -1, -1):
        u, v = quad_uv(x, y, ox, oy + gap * i)
        m = quad_mask(u, v)
        if i:                                   # exposed edge of a lower sheet
            img = over(img, np.array(base, np.float64)[None, None, :] * edge_mul, m)
        else:                                   # top face
            img = over(img, fibre_tex(u, v, base, seed, grain, streak, mesh), m)
            img = over(img, (255, 255, 255), m * np.clip(1 - ((u - .28) ** 2 / .10 + (v - .3) ** 2 / .16), 0, 1) * 0.13)
            for e in (ss(0, .012, u) * (1 - ss(.012, .026, u)), ss(0, .012, v) * (1 - ss(.012, .026, v))):
                img = over(img, (255, 255, 255), m * e * 0.16)
    save(img, path)
    watermark(path)

SHEETS = [
    ("af-fibre-sheet-standard.jpg",    (206, 203, 188), dict(seed=11, grain=7.0)),
    ("af-fibre-sheet-ht.jpg",          (118, 126, 116), dict(seed=17, grain=8.5, streak=3.0)),
    ("af-fibre-sheet-reinforced.jpg",  (154, 152, 145), dict(seed=23, grain=6.0, mesh=9.0)),
    ("caf-jointing-sheet-std.jpg",     (176, 180, 187), dict(seed=29, grain=6.5)),
    ("caf-jointing-sheet-acid.jpg",    (150,  76,  58), dict(seed=31, grain=7.5, streak=2.5)),
    ("caf-jointing-sheet-metallic.jpg",(104, 108, 114), dict(seed=37, grain=6.0, mesh=11.0)),
]

if __name__ == "__main__":
    for f, c, kw in SHEETS:
        sheet("public/images/products/" + f, c, **kw)
        print("ok", f)
