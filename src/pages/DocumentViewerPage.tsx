import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  AlertTriangle,
  Download,
  ExternalLink,
  Minus,
  Plus,
  Printer,
} from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
// Vite serves the worker as its own asset; pdf.js refuses to parse without it.
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { findTechnicalDocument } from '../data/technicalLibrary';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

const CHROME = '#26333B';
const CANVAS_BG = '#38474F';
const TEAL = '#588078';

/** Zoom steps the +/- buttons walk through. 1 = fit the available width. */
const ZOOM_STEPS = [0.5, 0.75, 1, 1.25, 1.5, 2, 3];

/*
 * Rendering above 2x device pixels buys nothing visible but costs a lot of
 * memory — an 8-page fittings chart at 3x zoom would otherwise allocate well
 * over a gigabyte of canvas backing store.
 */
const MAX_PIXEL_RATIO = 2;

interface PageCanvasProps {
  pdf: pdfjsLib.PDFDocumentProxy;
  pageNumber: number;
  /** CSS pixels available for the page, before the zoom multiplier. */
  baseWidth: number;
  zoom: number;
  onVisible: (pageNumber: number) => void;
}

/*
 * One <canvas> per page, rendered only once it is near the viewport. Painting
 * all eight pages of the fittings chart up front stalls the tab for a second or
 * two on a mid-range laptop; this way the first page is on screen immediately.
 */
const PageCanvas: React.FC<PageCanvasProps> = ({ pdf, pageNumber, baseWidth, zoom, onVisible }) => {
  const holderRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const renderTaskRef = useRef<pdfjsLib.RenderTask | null>(null);
  const [shouldRender, setShouldRender] = useState(pageNumber <= 2);
  const [aspect, setAspect] = useState<number | null>(null);

  // Enter the render queue a screenful early, and report the page number that
  // is currently front and centre so the toolbar counter can follow the scroll.
  useEffect(() => {
    const holder = holderRef.current;
    if (!holder) return;

    const preload = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          preload.disconnect();
        }
      },
      { rootMargin: '900px 0px' },
    );
    preload.observe(holder);

    const current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onVisible(pageNumber);
      },
      { threshold: 0.01, rootMargin: '-45% 0px -45% 0px' },
    );
    current.observe(holder);

    return () => {
      preload.disconnect();
      current.disconnect();
    };
  }, [pageNumber, onVisible]);

  useEffect(() => {
    if (!shouldRender || baseWidth <= 0) return;
    let cancelled = false;

    (async () => {
      const page = await pdf.getPage(pageNumber);
      if (cancelled) return;

      const unscaled = page.getViewport({ scale: 1 });
      setAspect(unscaled.height / unscaled.width);

      const cssWidth = baseWidth * zoom;
      const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
      const viewport = page.getViewport({ scale: (cssWidth / unscaled.width) * ratio });

      const canvas = canvasRef.current;
      const context = canvas?.getContext('2d');
      if (!canvas || !context || cancelled) return;

      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssWidth * (unscaled.height / unscaled.width)}px`;

      renderTaskRef.current?.cancel();
      const task = page.render({ canvas, canvasContext: context, viewport });
      renderTaskRef.current = task;
      try {
        await task.promise;
      } catch {
        // A cancel() from a zoom change lands here; nothing to report.
      }
    })();

    return () => {
      cancelled = true;
      renderTaskRef.current?.cancel();
    };
  }, [pdf, pageNumber, baseWidth, zoom, shouldRender]);

  // Hold the page's height before it paints so the scrollbar does not jump
  // around as pages stream in. A4-ish is a safe stand-in until we know better.
  const placeholderHeight = baseWidth * zoom * (aspect ?? 1.294);

  return (
    <div
      ref={holderRef}
      data-page={pageNumber}
      className="pdf-page-holder"
      style={{ width: baseWidth * zoom, minHeight: placeholderHeight }}
    >
      <canvas ref={canvasRef} aria-label={`Page ${pageNumber}`} />
    </div>
  );
};

export const DocumentViewerPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const doc = useMemo(() => findTechnicalDocument(slug), [slug]);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [pdf, setPdf] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [baseWidth, setBaseWidth] = useState(0);
  const [zoomIndex, setZoomIndex] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);

  const zoom = ZOOM_STEPS[zoomIndex];

  useEffect(() => {
    if (doc) document.title = `${doc.title} — Jyoti Metal (India)`;
  }, [doc]);

  useEffect(() => {
    if (!doc) return;
    setStatus('loading');
    const task = pdfjsLib.getDocument({ url: doc.file });
    task.promise
      .then((instance) => {
        setPdf(instance);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));

    return () => {
      setPdf(null);
      // Destroying the loading task tears down the document and the worker too.
      task.destroy();
    };
  }, [doc]);

  // Fit the page to the column, leaving a gutter either side like Drive does.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const measure = () => {
      const gutter = el.clientWidth < 720 ? 24 : 96;
      setBaseWidth(Math.max(240, Math.min(el.clientWidth - gutter, 1000)));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [status]);

  const handleVisible = useCallback((page: number) => setCurrentPage(page), []);

  const handlePrint = useCallback(() => {
    if (!doc) return;
    // Print off a hidden frame so the viewer chrome never lands on the paper.
    const frame = document.createElement('iframe');
    frame.style.position = 'fixed';
    frame.style.right = '0';
    frame.style.bottom = '0';
    frame.style.width = '0';
    frame.style.height = '0';
    frame.style.border = '0';
    frame.src = doc.file;
    frame.onload = () => {
      try {
        frame.contentWindow?.focus();
        frame.contentWindow?.print();
      } catch {
        window.open(doc.file, '_blank', 'noopener');
      }
    };
    document.body.appendChild(frame);
  }, [doc]);

  const styles = `
    .pdf-viewer-root {
      position: fixed;
      inset: 0;
      display: flex;
      flex-direction: column;
      background: ${CANVAS_BG};
      font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
      color: #FFFFFF;
    }
    .pdf-toolbar {
      display: flex;
      align-items: center;
      gap: 16px;
      flex: 0 0 auto;
      padding: 10px 18px;
      background: ${CHROME};
      border-bottom: 1px solid rgba(255, 255, 255, 0.09);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.28);
      z-index: 2;
    }
    .pdf-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
      text-decoration: none;
      color: inherit;
    }
    .pdf-brand img { width: 38px; height: 38px; flex: 0 0 auto; }
    .pdf-doc-title {
      display: block;
      font-size: 0.95rem;
      font-weight: 700;
      color: #FFFFFF;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.25;
    }
    .pdf-doc-sub {
      display: block;
      font-size: 0.72rem;
      font-weight: 600;
      color: #9FB4AE;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-top: 2px;
    }
    .pdf-toolbar-spacer { flex: 1 1 auto; }
    .pdf-tool-group {
      display: flex;
      align-items: center;
      gap: 2px;
      flex: 0 0 auto;
    }
    .pdf-counter {
      font-size: 0.82rem;
      font-weight: 600;
      color: #C6D4D0;
      font-variant-numeric: tabular-nums;
      padding: 0 10px;
      white-space: nowrap;
    }
    .pdf-icon-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 34px;
      height: 34px;
      color: #E4EDEA;
      background: transparent;
      border: 0;
      cursor: pointer;
      transition: background-color 140ms ease;
    }
    .pdf-icon-btn:hover:not(:disabled) { background: rgba(255, 255, 255, 0.12); }
    .pdf-icon-btn:disabled { opacity: 0.35; cursor: default; }
    .pdf-icon-btn:focus-visible { outline: 2px solid ${TEAL}; outline-offset: -2px; }
    .pdf-download {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 9px 16px;
      font-size: 0.83rem;
      font-weight: 700;
      color: #FFFFFF;
      background: ${TEAL};
      border: 0;
      text-decoration: none;
      cursor: pointer;
      white-space: nowrap;
    }
    .pdf-download:hover { background: #4D716A; }
    .pdf-scroll {
      flex: 1 1 auto;
      overflow: auto;
      padding: 26px 0 60px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      scroll-behavior: auto;
    }
    .pdf-page-holder {
      background: #FFFFFF;
      box-shadow: 0 2px 14px rgba(0, 0, 0, 0.42);
      flex: 0 0 auto;
    }
    .pdf-page-holder canvas { display: block; }
    .pdf-state {
      margin: auto;
      max-width: 460px;
      padding: 34px 30px;
      text-align: center;
      color: #DCE7E3;
    }
    .pdf-spinner {
      width: 34px;
      height: 34px;
      margin: 0 auto 16px;
      border: 3px solid rgba(255, 255, 255, 0.22);
      border-top-color: ${TEAL};
      border-radius: 50%;
      animation: pdf-spin 800ms linear infinite;
    }
    @keyframes pdf-spin { to { transform: rotate(360deg); } }
    @media (prefers-reduced-motion: reduce) { .pdf-spinner { animation-duration: 2.4s; } }

    @media (max-width: 720px) {
      .pdf-toolbar { gap: 10px; padding: 8px 12px; }
      .pdf-doc-title { font-size: 0.84rem; }
      .pdf-doc-sub, .pdf-zoom-group, .pdf-print-btn { display: none; }
      .pdf-download { padding: 9px 12px; }
      .pdf-download span { display: none; }
      .pdf-scroll { padding: 14px 0 40px; gap: 12px; }
    }
  `;

  if (!doc) {
    return (
      <div className="pdf-viewer-root">
        <style>{styles}</style>
        <div className="pdf-state">
          <AlertTriangle size={30} style={{ color: '#E8B04B', marginBottom: 14 }} />
          <p style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 8px' }}>Document not found</p>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 20px', color: '#B6C6C1' }}>
            This reference sheet is no longer published at this address.
          </p>
          <Link to="/certifications" className="pdf-download" style={{ display: 'inline-flex' }}>
            Back to certifications
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pdf-viewer-root">
      <style>{styles}</style>

      <header className="pdf-toolbar">
        <Link to="/certifications" className="pdf-brand" title="Jyoti Metal (India) — certifications">
          <img src="/images/jmi_logo.png" alt="Jyoti Metal (India)" width={38} height={38} />
          <span style={{ minWidth: 0 }}>
            <span className="pdf-doc-title">{doc.title}</span>
            <span className="pdf-doc-sub">
              Jyoti Metal (India) · {doc.pages} {doc.pages === 1 ? 'page' : 'pages'} · {doc.size}
            </span>
          </span>
        </Link>

        <span className="pdf-toolbar-spacer" />

        <span className="pdf-counter">
          {currentPage} / {pdf?.numPages ?? doc.pages}
        </span>

        <div className="pdf-tool-group pdf-zoom-group">
          <button
            type="button"
            className="pdf-icon-btn"
            onClick={() => setZoomIndex((i) => Math.max(0, i - 1))}
            disabled={zoomIndex === 0}
            aria-label="Zoom out"
          >
            <Minus size={18} />
          </button>
          <button
            type="button"
            className="pdf-icon-btn"
            onClick={() => setZoomIndex((i) => Math.min(ZOOM_STEPS.length - 1, i + 1))}
            disabled={zoomIndex === ZOOM_STEPS.length - 1}
            aria-label="Zoom in"
          >
            <Plus size={18} />
          </button>
        </div>

        <div className="pdf-tool-group">
          <button
            type="button"
            className="pdf-icon-btn pdf-print-btn"
            onClick={handlePrint}
            aria-label="Print this document"
          >
            <Printer size={18} />
          </button>
          <a
            className="pdf-icon-btn pdf-print-btn"
            href={doc.file}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open the raw PDF in a new tab"
          >
            <ExternalLink size={17} />
          </a>
        </div>

        <a className="pdf-download" href={doc.file} download>
          <Download size={16} /> <span>Download</span>
        </a>
      </header>

      <div className="pdf-scroll" ref={scrollRef}>
        {status === 'loading' && (
          <div className="pdf-state">
            <div className="pdf-spinner" />
            <p style={{ fontSize: '0.9rem', margin: 0, color: '#B6C6C1' }}>Loading document…</p>
          </div>
        )}

        {status === 'error' && (
          <div className="pdf-state">
            <AlertTriangle size={30} style={{ color: '#E8B04B', marginBottom: 14 }} />
            <p style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 8px' }}>
              This document could not be displayed
            </p>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 20px', color: '#B6C6C1' }}>
              Your browser may have blocked the preview. The file itself is fine — download it or
              open it directly.
            </p>
            <a className="pdf-download" href={doc.file} download style={{ display: 'inline-flex' }}>
              <Download size={16} /> <span>Download PDF</span>
            </a>
          </div>
        )}

        {status === 'ready' &&
          pdf &&
          baseWidth > 0 &&
          Array.from({ length: pdf.numPages }, (_, i) => (
            <PageCanvas
              key={`${doc.slug}-${i + 1}`}
              pdf={pdf}
              pageNumber={i + 1}
              baseWidth={baseWidth}
              zoom={zoom}
              onVisible={handleVisible}
            />
          ))}
      </div>
    </div>
  );
};
