#!/bin/bash
# Download every non-blog Champak page into pages/, 4 at a time, skipping ones already present.
cd "$(dirname "$0")" || exit 1
mkdir -p pages
grep -v '/blog/' urls.txt | grep -E '\.html$' > product_urls.txt
total=$(wc -l < product_urls.txt)
echo "Product URLs: $total"

fetch_one() {
  url="$1"
  slug=$(basename "$url" .html)
  out="pages/${slug}.html"
  if [ -s "$out" ]; then return; fi
  code=$(curl -sL --max-time 40 --retry 2 --retry-delay 2 \
    -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36" \
    "$url" -o "$out" -w "%{http_code}")
  if [ "$code" != "200" ]; then echo "FAIL $code $slug"; rm -f "$out"; fi
}
export -f fetch_one

xargs -P 4 -I{} bash -c 'fetch_one "$@"' _ {} < product_urls.txt
echo "Downloaded: $(ls pages | wc -l)"
