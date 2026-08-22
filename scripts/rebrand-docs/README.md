# Re-badging the client-supplied reference PDFs

The charts in `doc for cert/` were originally published by four other companies
(Montex Forge, Tioga Pipe, Steel Tubes India, Kalpataru Piping). These scripts
strip that branding, put the Jyoti Metal (India) mark in its place, and bring
all seven sheets onto one accent colour. **No table data is altered.**

Untouched originals live in `doc for cert/_original_source/`; the scripts read
from there and write to whatever directory you pass as the single argument, so
they are safe to re-run.

    pip install pymupdf pillow
    for s in do_montex do_tioga do_sti do_kalpataru; do
        python3 $s.py "../../doc for cert"
    done

Then refresh the copies the website serves and their cover images:

    cd ../.. && cp "doc for cert/<file>.pdf" public/docs/<slug>.pdf
    pdftoppm -r 60 -jpeg -f 1 -l 1 -scale-to-x 440 -scale-to-y -1 \
        public/docs/<slug>.pdf public/images/docs/<slug>

…and re-check `pages` and `size` in `src/data/technicalLibrary.ts`, which the
cards print verbatim.

## What each script does

Every script replaces the masthead and footer, then deletes the covered
third-party wording from the file so it cannot be extracted either.

* `do_montex.py` — four sheets. The catalogue was flattened to vector art by
  Ghostscript, so its two maroons survive as plain DeviceCMYK fill operators
  and swap straight out.
* `do_tioga.py` — also drops the "available in commercial and nuclear"
  strapline and the five capability panels on page 2 (piping/tubing, military
  spec, nuclear materials, specialty alloys, specialties), which describe the
  original publisher's programmes. Its orange is a single PANTONE separation:
  re-pointing the tint transform re-tints every bar, rule and figure at once
  and keeps partial tints proportional.
* `do_sti.py` — swaps the two cyan row tints and re-tints the masthead swoosh
  inside the artwork itself.
* `do_kalpataru.py` — repaints the footer web bar and page-number chip.

## Shared pieces (`brand.py`)

* `DEEP` / `BRIGHT` / `PALE` / `PALE_2` — the house palette every sheet maps onto
* `header_band()` – white→teal gradient masthead with the JMI mark + wordmark
* `lockup()`      – logo beside a stacked wordmark, auto-fitted to the box
* `recolour_contents()` – substitutes colour operators in a page's content stream
* `strip_text()`  – deletes covered third-party wording, leaving line art intact
* `scrub_meta()`  – rewrites Title/Author/Producer and drops the XMP packet
