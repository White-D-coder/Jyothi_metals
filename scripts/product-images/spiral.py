import sys, numpy as np
sys.path.insert(0, __import__("os").path.dirname(__file__))
from lib import *

SQ  = 0.80    # vertical squash -> viewed at a mild angle
THK = 13      # apparent edge thickness

OD, FACE, WD_OUT, WD_IN, IR_IN, BORE = 430, 402, 336, 214, 176, 176

def epolar(x, y, cx, cy):
    dx, dy = x - cx, (y - cy) / SQ
    return np.hypot(dx, dy), np.arctan2(dy, dx)

def spiral(path, edge_rgb, filler_rgb, wind_rgb=(196,200,207), ring_rgb=(150,155,163), seed=3):
    x, y = grids()
    cx, cy = W * 0.5, H * 0.46
    img = bg()

    r,  th  = epolar(x, y, cx, cy)
    rs, ths = epolar(x, y, cx, cy + THK)          # offset copy -> gives the side wall

    ann      = band(r,  BORE, OD)
    ann_off  = band(rs, BORE, OD)
    img = shadow(img, ann_off, dx=6, dy=26, blur=30, strength=0.38)

    # --- side wall: colour-coded OD edge (ASME B16.20) ---
    side = np.clip(ann_off - ann, 0, 1)
    wall = metal(r, th, np.array(edge_rgb) * 0.62, aniso=0.06, seed=seed+1, rough=2.0)
    dk   = ss(cy, cy + THK * 2.2, y)[..., None] * 0.35          # wall darkens downward
    img  = over(img, wall * (1 - dk), side)

    # --- outer centering ring (machined carbon steel) ---
    img = over(img, metal(r, th, ring_rgb, aniso=0.14, seed=seed, rough=3.0), band(r, WD_OUT, FACE))
    # thin painted line where the face meets the coded OD
    img = over(img, metal(r, th, edge_rgb, aniso=0.10, seed=seed+4, rough=2.0), band(r, FACE-11, FACE))

    # --- winding: true Archimedean spiral of metal strip + filler ---
    p = 6.2
    ph = 2 * np.pi * r / p + th
    w  = np.clip((0.5 + 0.5 * np.sin(ph) - 0.42) * 2.0, 0, 1)
    mcol = metal(r, th, wind_rgb,   aniso=0.30, seed=seed+7, rough=4.5)
    fcol = metal(r, th, filler_rgb, aniso=0.09, seed=seed+9, rough=3.0)
    img = over(img, fcol * (1 - w[..., None]) + mcol * w[..., None], band(r, WD_IN, WD_OUT))

    # seating grooves either side of the winding
    for rr in (WD_OUT, WD_IN):
        img = img * (1 - (band(r, rr - 5, rr + 5) * 0.34)[..., None])

    # --- inner compression ring ---
    img = over(img, metal(r, th, ring_rgb, aniso=0.16, seed=seed+11, rough=3.0), band(r, IR_IN, WD_IN))

    # --- bore: open to background, with inner wall + contact shadow ---
    inner_wall = np.clip(band(r, 0, BORE) - band(rs, 0, BORE), 0, 1)
    img = over(img, metal(r, th, np.array(ring_rgb) * 0.62, aniso=0.05, seed=seed+13, rough=2.0), inner_wall)
    img = img * (1 - (band(r, BORE - 7, BORE + 4) * 0.30)[..., None])

    # soft specular sweep across the face
    spec = np.clip(1.0 - (((x - cx * 0.70) / (W * 0.30)) ** 2 + ((y - cy * 0.55) / (H * 0.40)) ** 2), 0, 1)
    img = over(img, (255, 255, 255), spec * ann * 0.14)

    save(img, path)
    watermark(path)

SPIRALS = [
    # ASME B16.20 colour code: OD edge = winding metal, filler = graphite
    ("spiral-wound-gasket-ss304.jpg",   (228, 188,  44), (74, 77, 82), 3),    # SS304  -> yellow
    ("spiral-wound-gasket-ss316l.jpg",  ( 46, 138,  74), (74, 77, 82), 13),   # SS316L -> green
    ("spiral-wound-gasket-inconel.jpg", (186, 146,  58), (74, 77, 82), 23),   # Inconel 600 -> gold
]

if __name__ == "__main__":
    for f, e, fl, sd in SPIRALS:
        spiral("public/images/products/" + f, e, fl, seed=sd)
        print("ok", f)
