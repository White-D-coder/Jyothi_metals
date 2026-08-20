"""Regenerate the 12 Gasketing Solutions product images into public/images/products/.

Run from the repo root:   python3 scripts/product-images/render_all.py
Requires: numpy, pillow.  Renders are procedural, so there is no third-party
imagery or branding involved -- only the JMI logo watermark.
"""
import os, sys, runpy
sys.path.insert(0, os.path.dirname(__file__))
for mod in ("sheets", "spiral", "precut"):
    runpy.run_module(mod, run_name="__main__")
