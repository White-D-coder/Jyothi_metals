import sys, os, pymupdf
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import brand

SRC = "/Users/onkardange/Documents/Jyothi_metals/doc for cert/_original_source"
OUT = sys.argv[1]
NAME = "Pipe Dimension & Weight.pdf"

GREY  = (88 / 255, 89 / 255, 91 / 255)      # 0x58595b, the body colour used throughout
TEAL  = (0.145, 0.361, 0.373)               # replaces the orange accent colour
ORANGE = (240 / 255, 64 / 255, 30 / 255)   # as the bar actually renders

doc = pymupdf.open(os.path.join(SRC, NAME))
p1, p2 = doc[0], doc[1]
W = lambda page, r: page.draw_rect(r, color=None, fill=(1, 1, 1), overlay=True)


def line(page, x, baseline, text, size=6.8, color=GREY, font="helv"):
    page.insert_text((x, baseline), text, fontname=font, fontsize=size,
                     color=color, overlay=True)


# strip the covered third-party wording so it cannot be extracted either
brand.strip_text(p1, [pymupdf.Rect(238, 24, 606, 90)])
brand.strip_text(p2, [pymupdf.Rect(415, 552, 508, 568),
                      pymupdf.Rect(31, 633.4, 102, 644.5),
                      pymupdf.Rect(318, 763.5, 480, 773.5),
                      pymupdf.Rect(24, 779, 345, 827)])

# ---------------------------------------------------------------- page 1 ---
# masthead
W(p1, pymupdf.Rect(20, 24, 160, 88))
lk = brand.lockup(112, 46, ["JYOTI METAL", "(INDIA)"], size_ratio=0.34)
p1.insert_image(pymupdf.Rect(28.8, 33, 140.8, 79), stream=brand.to_png(lk),
                overlay=True, keep_proportion=False)

# the three "Regional Center" contact blocks
W(p1, pymupdf.Rect(238, 24, 606, 90))
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
# "TIOGA SPECIALTIES" panel heading -> neutral heading, bar colour preserved
p2.draw_rect(pymupdf.Rect(416, 554.2, 507, 567.0), color=None, fill=ORANGE, overlay=True)
head, size = "SPECIALTIES", 9
hw = pymupdf.get_text_length(head, fontname="hebo", fontsize=size)
line(p2, 461.27 - hw / 2, 563.6, head, size=size, color=(1, 1, 1), font="hebo")

# "Contact Tioga for" table label
W(p2, pymupdf.Rect(31, 633.4, 102, 644.5))
line(p2, 32.0, 641.0, "Contact us for", size=7)

# credit line under the note block
W(p2, pymupdf.Rect(318, 763.5, 480, 773.5))
line(p2, 321.5, 770.9, "© Jyoti Metal (India)", size=6)

# footer: tagline + regional-centre call-out + tiogapipe.com
W(p2, pymupdf.Rect(24, 779, 345, 827))
line(p2, 29.9, 793.3, "JYOTI METAL (INDIA)", size=10, color=TEAL, font="hebo")
line(p2, 29.9, 806.3,
     "Call our sales team for stock availability and technical support",
     size=9.1, font="hebo")
line(p2, 29.9, 819.3, "www.jyotimetal.co.in", size=10, color=TEAL, font="hebo")

# footer mark
W(p2, pymupdf.Rect(486, 778, 606, 824))
lk2 = brand.lockup(112, 36, ["JYOTI METAL", "(INDIA)"], size_ratio=0.33,
                   logo_side="right")
p2.insert_image(pymupdf.Rect(487.4, 783, 599.4, 819), stream=brand.to_png(lk2),
                overlay=True, keep_proportion=False)

brand.scrub_meta(doc, "Pipe Dimensions and Weights")
doc.save(os.path.join(OUT, NAME), garbage=4, deflate=True)
print("wrote", NAME)
