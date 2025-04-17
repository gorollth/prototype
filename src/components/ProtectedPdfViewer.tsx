// src/components/ProtectedPdfViewer.tsx
import React, { useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { useRouter } from "next/router";

// Set worker path
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface ProtectedPdfViewerProps {
  url: string;
  watermark?: string;
  totalPages?: number;
}

const ProtectedPdfViewer: React.FC<ProtectedPdfViewerProps> = ({
  url,
  watermark = "CONFIDENTIAL",
  totalPages,
}) => {
  const [numPages, setNumPages] = React.useState<number | null>(null);
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // ฟังก์ชันเมื่อโหลดไฟล์ PDF สำเร็จ
  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  // ฟังก์ชันเปลี่ยนหน้า
  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber + offset;
      return Math.max(1, Math.min(numPages || 1, newPageNumber));
    });
  }

  // ป้องกันการคลิกขวา (เพื่อไม่ให้ Save as...)
  useEffect(() => {
    const container = containerRef.current;

    const preventContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    const preventKeyboardShortcuts = (e: KeyboardEvent) => {
      // ป้องกัน Ctrl+S, Ctrl+P, Ctrl+Shift+E (Save, Print, Inspect)
      if (
        (e.ctrlKey && (e.key === "s" || e.key === "p")) ||
        (e.ctrlKey && e.shiftKey && e.key === "e")
      ) {
        e.preventDefault();
        return false;
      }
    };

    // ป้องกันการลากภาพ
    const preventDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    if (container) {
      container.addEventListener(
        "contextmenu",
        preventContextMenu as EventListener
      );
      document.addEventListener("keydown", preventKeyboardShortcuts);
      container.addEventListener(
        "dragstart",
        preventDragStart as EventListener
      );
    }

    // คืนทรัพยากรเมื่อ component ถูกถอดออก
    return () => {
      if (container) {
        container.removeEventListener(
          "contextmenu",
          preventContextMenu as EventListener
        );
        document.removeEventListener("keydown", preventKeyboardShortcuts);
        container.removeEventListener(
          "dragstart",
          preventDragStart as EventListener
        );
      }
    };
  }, []);

  // ตรวจสอบ session ผู้ใช้
  useEffect(() => {
    // สมมติว่าเราตรวจสอบว่าผู้ใช้ล็อกอินแล้วหรือไม่
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login?redirect=" + router.asPath);
    }
  }, [router]);

  // เพิ่ม watermark
  const addWatermark = () => {
    const elements = document.querySelectorAll(".react-pdf__Page");
    elements.forEach((element) => {
      const watermarkDiv = document.createElement("div");
      watermarkDiv.className = "watermark";
      watermarkDiv.innerText = watermark;
      element.appendChild(watermarkDiv);
    });
  };

  useEffect(() => {
    // เพิ่ม watermark หลังจากโหลดหน้า PDF
    const timer = setTimeout(addWatermark, 1000);
    return () => clearTimeout(timer);
  }, [pageNumber, watermark]);

  return (
    <div className="pdf-container" ref={containerRef}>
      <div className="pdf-controls">
        <button onClick={() => changePage(-1)} disabled={pageNumber <= 1}>
          Previous
        </button>
        <span>
          Page {pageNumber} of {numPages || totalPages || "?"}
        </span>
        <button
          onClick={() => changePage(1)}
          disabled={numPages !== null && pageNumber >= numPages}
        >
          Next
        </button>
      </div>

      <div className="pdf-viewer">
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          options={{
            cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
            cMapPacked: true,
            standardFontDataUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/standard_fonts`,
          }}
        >
          <Page
            pageNumber={pageNumber}
            renderAnnotationLayer={false}
            renderTextLayer={true}
            width={800}
          />
        </Document>
      </div>

      <style jsx>{`
        .pdf-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 20px 0;
          position: relative;
          user-select: none;
        }
        .pdf-controls {
          display: flex;
          gap: 10px;
          margin-bottom: 10px;
          align-items: center;
        }
        .pdf-controls button {
          padding: 5px 10px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .pdf-controls button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }
        .pdf-viewer {
          position: relative;
          border: 1px solid #eaeaea;
          border-radius: 8px;
          overflow: hidden;
        }
        :global(.watermark) {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 50px;
          color: rgba(200, 0, 0, 0.2);
          transform: rotate(-45deg);
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default ProtectedPdfViewer;
