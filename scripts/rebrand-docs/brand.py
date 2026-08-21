"""Shared JMI branding helpers for re-badging the reference PDFs."""
from PIL import Image, ImageDraw, ImageFont
import io, os

LOGO = "/Users/onkardange/Documents/Jyothi_metals/public/images/jmi_logo.png"
ARIAL_B = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
ARIAL = "/System/Library/Fonts/Supplemental/Arial.ttf"

TEAL      = (54, 129, 132)     # logo teal  #368184
TEAL_DARK = (37, 92, 95)
TEAL_SUB  = (92, 140, 133)
BAND_TINT = (214, 236, 233)    # soft teal the gradient fades into

def logo_img():
    im = Image.open(LOGO).convert("RGBA")
    return im.crop(im.getchannel("A").getbbox())

def header_band(w_pt, h_pt, scale=8, name="JYOTI METAL (INDIA)",
                sub="AN ISO 9001:2015 CERTIFIED COMPANY", tint=BAND_TINT,
                pad_right=0.02, name_ratio=0.34, sub_ratio=0.155, rule=False):
    """White->teal gradient band with the JMI mark and wordmark on the right."""
    W, H = int(w_pt * scale), int(h_pt * scale)
    band = Image.new("RGB", (W, H), (255, 255, 255))
    px = band.load()
    for x in range(W):
        t = (x / (W - 1)) ** 2.6          # stays white most of the way, tints at the right
        col = tuple(int(255 + (c - 255) * t) for c in tint)
        for y in range(H):
            px[x, y] = col

    lg = logo_img()
    lh = int(H * 0.86)
    lg = lg.resize((int(lg.width * lh / lg.height), lh), Image.LANCZOS)
    lx = W - int(W * pad_right) - lg.width
    band.paste(lg, (lx, (H - lh) // 2), lg)

    d = ImageDraw.Draw(band)
    f_name = ImageFont.truetype(ARIAL_B, int(H * name_ratio))
    f_sub = ImageFont.truetype(ARIAL_B, int(H * sub_ratio))
    gap = int(H * 0.22)
    nb = d.textbbox((0, 0), name, font=f_name)
    sb = d.textbbox((0, 0), sub, font=f_sub, spacing=0)
    block_h = (nb[3] - nb[1]) + int(H * 0.14) + (sb[3] - sb[1])
    ty = (H - block_h) // 2
    tx = lx - gap
    d.text((tx - (nb[2] - nb[0]), ty - nb[1]), name, font=f_name, fill=TEAL_DARK)
    sy = ty + (nb[3] - nb[1]) + int(H * 0.14)
    d.text((tx - (sb[2] - sb[0]), sy - sb[1]), sub, font=f_sub, fill=TEAL_SUB)
    if rule:
        t = max(2, int(H * 0.018))
        d.rectangle([0, H - t, W, H], fill=TEAL)
    return band

def to_png(im):
    b = io.BytesIO()
    im.save(b, format="PNG")
    return b.getvalue()

def scrub_meta(doc, title):
    doc.set_metadata({"title": title, "author": "Jyoti Metal (India)",
                      "subject": "Technical reference chart",
                      "creator": "Jyoti Metal (India)", "producer": "Jyoti Metal (India)",
                      "keywords": ""})
    doc.del_xml_metadata()

def lockup(w_pt, h_pt, lines, scale=14, logo_side="left", gap_ratio=0.14,
           size_ratio=0.40, colors=None):
    """Transparent logo + stacked wordmark lockup, sized to w_pt x h_pt."""
    W, H = int(w_pt * scale), int(h_pt * scale)
    im = Image.new("RGBA", (W, H), (255, 255, 255, 0))
    lg = logo_img()
    lg = lg.resize((int(lg.width * H / lg.height), H), Image.LANCZOS)
    gap = int(H * gap_ratio)
    d = ImageDraw.Draw(im)
    avail = W - lg.width - gap
    fs = int(H * size_ratio)
    while fs > 4:                       # shrink until the longest line fits
        f = ImageFont.truetype(ARIAL_B, fs)
        if max(d.textlength(t, font=f) for t in lines) <= avail:
            break
        fs -= 1
    f = ImageFont.truetype(ARIAL_B, fs)
    size_ratio = fs / H
    colors = colors or [TEAL_DARK] * len(lines)
    boxes = [d.textbbox((0, 0), t, font=f) for t in lines]
    lead = int(H * size_ratio * 1.18)
    block_h = lead * (len(lines) - 1) + (boxes[0][3] - boxes[0][1])
    ty = (H - block_h) // 2
    if logo_side == "left":
        im.paste(lg, (0, 0), lg)
        tx = lg.width + gap
        for i, (t, b) in enumerate(zip(lines, boxes)):
            d.text((tx, ty + i * lead - b[1]), t, font=f, fill=colors[i])
    else:
        im.paste(lg, (W - lg.width, 0), lg)
        tx = W - lg.width - gap
        for i, (t, b) in enumerate(zip(lines, boxes)):
            d.text((tx - (b[2] - b[0]), ty + i * lead - b[1]), t, font=f, fill=colors[i])
    return im


def strip_text(page, rects):
    """Delete the third-party text under `rects` outright, leaving art intact."""
    import pymupdf
    for r in rects:
        page.add_redact_annot(r)
    page.apply_redactions(images=pymupdf.PDF_REDACT_IMAGE_NONE,
                          graphics=pymupdf.PDF_REDACT_LINE_ART_NONE,
                          text=pymupdf.PDF_REDACT_TEXT_REMOVE)
