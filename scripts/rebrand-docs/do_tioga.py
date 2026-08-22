import re
import sys, os, pymupdf
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import brand

SRC = "/Users/onkardange/Documents/Jyothi_metals/doc for cert/_original_source"
OUT = sys.argv[1]
NAME = "Pipe Dimension & Weight.pdf"

GREY = (88 / 255, 89 / 255, 91 / 255)       # 0x58595b, the body colour used throughout
TEAL = brand.DEEP

# The five capability panels at the foot of page 2. Their headings and tables
# describe the original publisher's programmes, not ours, so both go.
PANELS = [
    pymupdf.Rect(28, 468, 310, 774),    # piping/tubing, military spec, nuclear
    pymupdf.Rect(320, 455, 602, 723),   # specialty alloys, specialties
]

# Page 1's strapline sits 1.4pt inside the title's glyph box, so a redaction
# wide enough to catch it also eats "PIPE DIMENSIONS AND". Redact from below
# the title's box and let the white cover deal with the atom device beside it.
SUBTITLE_REDACT = pymupdf.Rect(25, 114.8, 245, 129.5)
SUBTITLE_COVER = pymupdf.Rect(26, 111.2, 250, 129.8)

doc = pymupdf.open(os.path.join(SRC, NAME))
p1, p2 = doc[0], doc[1]
W = lambda page, r: page.draw_rect(r, color=None, fill=(1, 1, 1), overlay=True)


def line(page, x, baseline, text, size=6.8, color=GREY, font="helv"):
    page.insert_text((x, baseline), text, fontname=font, fontsize=size,
                     color=color, overlay=True)


# ------------------------------------------------------------- deletions ---
# Text goes from the file itself; the line art under it is covered below.
brand.strip_text(p1, [
    pymupdf.Rect(238, 24, 606, 90),     # the three "Regional Center" blocks
    SUBTITLE_REDACT,                    # "Available in commercial and nuclear"
])
brand.strip_text(p2, PANELS + [
    pymupdf.Rect(318, 763.5, 480, 773.5),
    pymupdf.Rect(24, 779, 345, 827),
])

# ---------------------------------------------------------------- colour ---
# Almost every orange mark on these pages is one spot colour, so re-pointing
# the separation's tint transform re-tints the bars, the rules and the metric
# figures in one move, and keeps every partial tint proportional.
separations = 0
for xref in range(1, doc.xref_length()):
    try:
        obj = doc.xref_object(xref)
    except Exception:
        continue
    if '/Separation' not in obj or not re.search(r'/C1\s*\[\s*0\s+\.?83\s+1\s+0\s*\]', obj):
        continue
    doc.update_object(xref, (
        '[ /Separation /JMI#20Teal /DeviceRGB << '
        '/C0 [ 1 1 1 ] '
        f'/C1 [ {TEAL[0]:.4g} {TEAL[1]:.4g} {TEAL[2]:.4g} ] '
        '/Domain [ 0 1 ] /FunctionType 2 /N 1 /Range [ 0 1 0 1 0 1 ] >> ]'
    ))
    separations += 1

# The few oranges set directly in CMYK. Redaction re-emits the content stream,
# so match on the number values rather than the original spacing.
direct = sum(brand.recolour_contents(page, {'0 0.83 1 0 k': brand.fmt_rgb(TEAL)})
             for page in doc)

# ---------------------------------------------------------------- page 1 ---
W(p1, pymupdf.Rect(20, 24, 160, 88))    # Tioga wordmark (vector)
W(p1, SUBTITLE_COVER)                   # strapline + atom device
lk = brand.lockup(112, 46, ["JYOTI METAL", "(INDIA)"], size_ratio=0.34)
p1.insert_image(pymupdf.Rect(28.8, 33, 140.8, 79), stream=brand.to_png(lk),
                overlay=True, keep_proportion=False)

COLS = [
    (242.1, [("Head Office", None), ("102/8, Praveen House", None),
             ("4th Kumbharwada Lane", None), ("Mumbai 400 004, India", None)]),
    (368.0, [("Works", None), ("Plot E-41 (G-1), RIICO Ind. Area", None),
             ("Khushkhera 301 707", None), ("Distt. Alwar, Rajasthan, India", None)]),
    (485.3, [("Sales & Enquiries", None), ("+91 93222 81549", "O"),
             ("+91 97693 88813", "O"), ("info@jyotimetal.co.in", "E"),
             ("www.jyotimetal.co.in", "W")]),
]
for x, rows in COLS:
    for i, (text, prefix) in enumerate(rows):
        base = 39.0 + i * 8.2
        if prefix:
            line(p1, x, base, prefix, color=TEAL, font="hebo")
            line(p1, x + 8.5, base, text)
        else:
            line(p1, x, base, text, font=("hebo" if i == 0 else "helv"))

# ---------------------------------------------------------------- page 2 ---
for rect in PANELS:                     # the panels' rules and header bars
    W(p2, rect)
W(p2, pymupdf.Rect(318, 763.5, 480, 773.5))
W(p2, pymupdf.Rect(24, 779, 345, 827))  # tagline, call-out and web address
W(p2, pymupdf.Rect(486, 778, 606, 824))  # Tioga wordmark (vector)

line(p2, 321.5, 770.9, "© Jyoti Metal (India)", size=6)

line(p2, 29.9, 793.3, "JYOTI METAL (INDIA)", size=10, color=TEAL, font="hebo")
line(p2, 29.9, 806.3,
     "Call our sales team for stock availability and technical support",
     size=9.1, font="hebo")
line(p2, 29.9, 819.3, "www.jyotimetal.co.in", size=10, color=TEAL, font="hebo")

lk2 = brand.lockup(112, 36, ["JYOTI METAL", "(INDIA)"], size_ratio=0.33,
                   logo_side="right")
p2.insert_image(pymupdf.Rect(487.4, 783, 599.4, 819), stream=brand.to_png(lk2),
                overlay=True, keep_proportion=False)

brand.scrub_meta(doc, "Pipe Dimensions and Weights")
doc.save(os.path.join(OUT, NAME), garbage=4, deflate=True)
print(f"wrote {NAME} ({separations} spot colour(s) re-pointed, {direct} direct fills)")
