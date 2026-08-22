import io
import sys, os, pymupdf
from PIL import Image
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import brand

SRC = "/Users/onkardange/Documents/Jyothi_metals/doc for cert/_original_source"
OUT = sys.argv[1]
NAME = "SPECIFICATION & TOLERANCE FOR PIPES & TUBES.pdf"

# The artwork's flat cyan, and the teal it becomes.
SRC_BLUE = (47, 178, 238)
DST_TEAL = (45, 145, 143)


def reteal(im):
    """Shift the artwork's cyan family onto the brand teal.

    The swoosh is flat colour over white and grey, so a pixel is some blend of
    the cyan and a neutral. (B - R) recovers that blend fraction exactly — it
    is zero for any neutral — which gives a clean edge with no fringing.
    """
    im = im.convert("RGB")
    px = im.load()
    span = SRC_BLUE[2] - SRC_BLUE[0]
    delta = [DST_TEAL[i] - SRC_BLUE[i] for i in range(3)]
    touched = 0
    for y in range(im.height):
        for x in range(im.width):
            r, g, b = px[x, y]
            t = (b - r) / span
            if t <= 0.02:
                continue
            t = min(t, 1.0)
            px[x, y] = tuple(
                min(255, max(0, round(c + t * d))) for c, d in zip((r, g, b), delta)
            )
            touched += 1
    return im, touched


doc = pymupdf.open(os.path.join(SRC, NAME))
page = doc[0]

# --- table tints ------------------------------------------------------------
# CS0 is ICCBased RGB, so the two row shades are plain triples in the stream.
tints = brand.recolour_contents(page, {
    '0.902 1 1  scn': f'{brand.PALE[0]:.4g} {brand.PALE[1]:.4g} {brand.PALE[2]:.4g}  scn',
    '0.702 1 1  scn': f'{brand.PALE_2[0]:.4g} {brand.PALE_2[1]:.4g} {brand.PALE_2[2]:.4g}  scn',
})

# --- the masthead swoosh ----------------------------------------------------
recoloured = 0
for info in page.get_image_info(xrefs=True):
    xref = info["xref"]
    if not xref:
        continue
    raw = doc.extract_image(xref)
    art, touched = reteal(Image.open(io.BytesIO(raw["image"])))
    # The page border is its own image and has no cyan in it; re-encoding it
    # would only degrade it, so leave anything untouched exactly as it was.
    if not touched:
        continue
    buf = io.BytesIO()
    art.save(buf, format="PNG", optimize=True)
    page.replace_image(xref, stream=buf.getvalue())
    recoloured += 1

# --- masthead ---------------------------------------------------------------
# Top strip of the artwork: third-party certification badges, the PED line and
# the STI wordmark. The swoosh below it is page furniture and stays.
brand.strip_text(page, [pymupdf.Rect(0, 18.6, 544, 50.4)])
page.draw_rect(pymupdf.Rect(0, 18.6, 544, 50.4), color=None, fill=(1, 1, 1), overlay=True)
band = pymupdf.Rect(14, 21.5, 538, 48.5)
png = brand.to_png(brand.header_band(band.width, band.height, scale=6,
                                     tint=(255, 255, 255), name_ratio=0.42,
                                     sub_ratio=0.19))
page.insert_image(band, stream=png, overlay=True)

brand.scrub_meta(doc, "ASTM Specification & Tolerance for Tubing & Piping")
doc.save(os.path.join(OUT, NAME), garbage=4, deflate=True)
print(f"wrote {NAME} ({tints} row tints, {recoloured} image(s) re-tinted)")
