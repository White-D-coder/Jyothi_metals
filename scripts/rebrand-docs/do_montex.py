import sys, os, pymupdf
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import brand

SRC = "/Users/onkardange/Documents/Jyothi_metals/doc for cert/_original_source"
OUT = sys.argv[1]

# geometry lifted from the source pages (identical on every Montex page)
BAND      = pymupdf.Rect(26.0, 19.76, 586.0, 62.4)     # peach gradient strip + logo
BAND_WIPE = pymupdf.Rect(18, 10, 596, 68)
URL       = pymupdf.Rect(416.19, 767.96, 561.06, 781.33)  # "www.montexforge.com"
URL_WIPE  = pymupdf.Rect(360, 761, 600, 788)
NEW_URL   = "www.jyotimetal.co.in"

FILES = {
    "CARBON & ALLOY STEEL CHEMICAL , MECHANICAL & DIMENSION.pdf":
        "Carbon & Alloy Steel - Chemical, Mechanical & Dimensional Data",
    "FITTINGS DIMENSION.pdf": "Butt Weld Fittings - Dimensional Data",
    "FLANGES DIMENSION.pdf": "Flanges - Dimensional Data",
    "STAINLESS STEEL CHEMICAL & MECHANICAL PROPERTIES.pdf":
        "Stainless Steel - Chemical & Mechanical Properties",
}

band_png = brand.to_png(brand.header_band(BAND.width, BAND.height))

for fname, title in FILES.items():
    doc = pymupdf.open(os.path.join(SRC, fname))
    for page in doc:
        page.draw_rect(BAND_WIPE, color=None, fill=(1, 1, 1), overlay=True)
        page.insert_image(BAND, stream=band_png, overlay=True)

        page.draw_rect(URL_WIPE, color=None, fill=(1, 1, 1), overlay=True)
        size = 14.45
        w = pymupdf.get_text_length(NEW_URL, fontname="hebo", fontsize=size)
        page.insert_text((URL.x1 - w, 778.34), NEW_URL, fontname="hebo",
                         fontsize=size, color=(0.13, 0.11, 0.11), overlay=True)
    brand.scrub_meta(doc, title)
    doc.save(os.path.join(OUT, fname), garbage=4, deflate=True)
    doc.close()
    print("wrote", fname)
