import sys, numpy as np
sys.path.insert(0, __import__("os").path.dirname(__file__))
from lib import *

SQ, THK = 0.80, 12

def epolar(x, y, cx, cy):
    dx, dy = x - cx, (y - cy) / SQ
    return np.hypot(dx, dy), np.arctan2(dy, dx)

def fibre(r, th, base, seed, grain=6.0):
    h, w = r.shape
    n = np.random.default_rng(seed).normal(0, 1, (h, w))
    n = np.array(Image.fromarray(((n * 40 + 128).clip(0, 255)).astype(np.uint8))
                 .filter(ImageFilter.GaussianBlur(1.2)), np.float64)
    lam = 1.0 + (n - 128) / 128.0 * (grain / 100.0)
    lam += 0.16 * np.cos(th - 2.3) * 0.5
    return np.clip(np.array(base, np.float64)[None, None, :] * lam[..., None], 0, 255)

def holes_mask(x, y, cx, cy, rb, rh, n, phase=0.0):
    m = np.zeros(x.shape)
    for k in range(n):
        a = phase + 2 * np.pi * k / n
        hx, hy = cx + rb * np.cos(a), cy + SQ * rb * np.sin(a)
        rr, _ = epolar(x, y, hx, hy)
        m = np.maximum(m, 1 - ss(rh - 1.2, rh + 1.2, rr))
    return np.clip(m, 0, 1)

def precut(path, base, od, bore, nholes=0, rb=0, rh=0, jacket=False, seed=41):
    x, y = grids()
    cx, cy = W * 0.5, H * 0.47
    img = bg()
    r,  th  = epolar(x, y, cx, cy)
    rs, _   = epolar(x, y, cx, cy + THK)

    body     = band(r,  bore, od)
    body_off = band(rs, bore, od)
    hm = holes_mask(x, y, cx, cy, rb, rh, nholes) if nholes else np.zeros(x.shape)
    hm_off = holes_mask(x, y, cx, cy + THK, rb, rh, nholes) if nholes else np.zeros(x.shape)
    body     = np.clip(body - hm, 0, 1)
    body_off = np.clip(body_off - hm_off, 0, 1)

    img = shadow(img, body_off, dx=8, dy=22, blur=26, strength=0.38)

    # side walls (outer, bore, and bolt holes) then the top face
    side = np.clip(body_off - body, 0, 1)
    img = over(img, np.array(base, np.float64)[None, None, :] * 0.60, side)

    face = fibre(r, th, base, seed)
    if jacket:
        met = metal(r, th, (198, 202, 209), aniso=0.26, seed=seed, rough=3.4)
        face = met
    img = over(img, face, body)

    if jacket:      # jacket fold lines + exposed filler band
        for rr, dark in ((od - 26, 0.30), (bore + 26, 0.26)):
            img = img * (1 - (band(r, rr - 3, rr + 3) * dark * body)[..., None])
        fill = band(r, bore + 30, od - 30) * body
        img = over(img, metal(r, th, (78, 80, 85), aniso=0.06, seed=seed + 5, rough=3.0), fill * 0.55)

    # edge definition
    for rr in (od, bore):
        img = img * (1 - (band(r, rr - 5, rr + 2) * 0.22 * np.clip(body + hm, 0, 1))[..., None])
    if nholes:
        img = img * (1 - (hm * band(r, bore, od) * 0.30)[..., None])

    spec = np.clip(1 - (((x - cx * 0.74) / (W * 0.32)) ** 2 + ((y - cy * 0.60) / (H * 0.42)) ** 2), 0, 1)
    img = over(img, (255, 255, 255), spec * body * 0.12)
    save(img, path); watermark(path)

if __name__ == "__main__":
    precut("public/images/products/pre-cut-flange-gasket-fullface.jpg",
           (198, 196, 182), od=418, bore=196, nholes=12, rb=350, rh=30, seed=41)
    precut("public/images/products/pre-cut-flange-gasket-ring.jpg",
           (168, 172, 180), od=356, bore=232, seed=43)
    precut("public/images/products/pre-cut-gasket-metal-jacketed.jpg",
           (196, 200, 207), od=402, bore=236, jacket=True, seed=47)
    print("done")
