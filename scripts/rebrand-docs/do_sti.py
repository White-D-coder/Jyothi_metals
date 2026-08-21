import sys, os, pymupdf
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import brand

SRC = "/Users/onkardange/Documents/Jyothi_metals/doc for cert/_original_source"
OUT = sys.argv[1]
NAME = "SPECIFICATION & TOLERANCE FOR PIPES & TUBES.pdf"

doc = pymupdf.open(os.path.join(SRC, NAME))
page = doc[0]

# top strip of the artwork: third-party certification badges, the PED line and
# the STI wordmark. The blue/grey swoosh below it is page furniture and stays.
brand.strip_text(page, [pymupdf.Rect(0, 18.6, 544, 50.4)])
page.draw_rect(pymupdf.Rect(0, 18.6, 544, 50.4), color=None, fill=(1, 1, 1), overlay=True)
band = pymupdf.Rect(14, 21.5, 538, 48.5)
png = brand.to_png(brand.header_band(band.width, band.height, scale=12,
                                     tint=(255, 255, 255), name_ratio=0.42,
                                     sub_ratio=0.19))
page.insert_image(band, stream=png, overlay=True)

brand.scrub_meta(doc, "ASTM Specification & Tolerance for Tubing & Piping")
doc.save(os.path.join(OUT, NAME), garbage=4, deflate=True)
print("wrote", NAME)
