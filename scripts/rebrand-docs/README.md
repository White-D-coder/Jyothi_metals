# Re-badging the client-supplied reference PDFs

The charts in `doc for cert/` were originally published by four other companies
(Montex Forge, Tioga Pipe, Steel Tubes India, Kalpataru Piping). These scripts
strip that branding and put the Jyoti Metal (India) mark in its place. **Only
mastheads, footers, logos and company names are touched — no table data is
altered.**

Untouched originals live in `doc for cert/_original_source/`.

    pip install pymupdf pillow
    python3 do_montex.py    "doc for cert"
    python3 do_tioga.py     "doc for cert"
    python3 do_sti.py       "doc for cert"
    python3 do_kalpataru.py "doc for cert"

Each script reads the untouched originals from `SRC` (set at the top of the
file) and writes the re-badged copy into the directory given as the argument.

`brand.py` holds the shared pieces:

* `header_band()` – white→teal gradient masthead with the JMI mark + wordmark
* `lockup()`      – logo beside a stacked wordmark, auto-fitted to the box
* `strip_text()`  – deletes covered third-party wording so it can't be
                    extracted from the file either
* `scrub_meta()`  – rewrites Title/Author/Producer and drops the XMP packet
