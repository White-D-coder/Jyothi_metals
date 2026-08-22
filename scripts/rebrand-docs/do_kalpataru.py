import sys, os, pymupdf
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import brand

SRC = "/Users/onkardange/Documents/Jyothi_metals/doc for cert/_original_source"
OUT = sys.argv[1]
NAME = "FORMULA-FOR-WEIGHT-CALCULATION.pdf"

doc = pymupdf.open(os.path.join(SRC, NAME))
page = doc[0]

# --- header: photo banner + e-mail flashes + KPS mark ---------------------
page.draw_rect(pymupdf.Rect(40, 45, 1800, 362), color=None, fill=(1, 1, 1), overlay=True)
band = pymupdf.Rect(118.5, 78, 1777.7, 330)
png = brand.to_png(brand.header_band(band.width, band.height, scale=2,
                                     name_ratio=0.24, sub_ratio=0.105,
                                     tint=(255, 255, 255), rule=True))
page.insert_image(band, stream=png, overlay=True)

# --- footer web bar --------------------------------------------------------
# Painted rather than patched: the bar was royal blue with an orange tab poking
# out of its left edge, and the page-number chip beside it a lighter blue.
# The scan is a JPEG, so the old blue leaves a ringing halo a few points
# outside the bar. Clear the whole strip before repainting or it shows.
page.draw_rect(pymupdf.Rect(1185, 2460, 1788, 2568), color=None, fill=(1, 1, 1),
               overlay=True)
box = pymupdf.Rect(1194, 2469, 1674, 2559)
page.draw_rect(box, color=None, fill=brand.DEEP, overlay=True)
txt = "Web :  www.jyotimetal.co.in"
size = 34
w = pymupdf.get_text_length(txt, fontname="hebo", fontsize=size)
page.insert_text((box.x0 + (box.width - w) / 2, 2525), txt, fontname="hebo",
                 fontsize=size, color=(1, 1, 1), overlay=True)

chip = pymupdf.Rect(1680, 2469, 1779, 2559)
page.draw_rect(chip, color=None, fill=brand.BRIGHT, overlay=True)
num, num_size = "28", 40
nw = pymupdf.get_text_length(num, fontname="helv", fontsize=num_size)
page.insert_text((chip.x0 + (chip.width - nw) / 2, 2528), num, fontname="helv",
                 fontsize=num_size, color=(1, 1, 1), overlay=True)

brand.scrub_meta(doc, "Formula for Weight Calculation")
doc.save(os.path.join(OUT, NAME), garbage=4, deflate=True)
print("wrote", NAME)
