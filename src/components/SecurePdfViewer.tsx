// src/components/SecurePdfViewer.tsx
import React, { useEffect, useRef } from "react";

interface SecurePDFViewerProps {
  pdfUrl: string;
  width?: string;
  height?: string;
  className?: string;
}

const SecurePDFViewer: React.FC<SecurePDFViewerProps> = ({
  pdfUrl,
  width = "100%",
  height = "600px",
  className = "",
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // ป้องกันการคลิกขวาบน iframe
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener("contextmenu", handleContextMenu);

      // ลองป้องกันการดาวน์โหลดผ่าน iframe
      iframe.onload = () => {
        try {
          const iframeDocument =
            iframe.contentDocument || iframe.contentWindow?.document;

          if (iframeDocument) {
            // ป้องกันการคลิกขวาในเอกสาร iframe
            iframeDocument.addEventListener("contextmenu", handleContextMenu);

            // เพิ่ม CSS เพื่อซ่อนปุ่มดาวน์โหลดใน PDF viewer
            const style = iframeDocument.createElement("style");
            style.textContent = `
              #download, #print, .print, .download, button[data-l10n-id="download"], button[data-l10n-id="print"] {
                display: none !important;
              }
            `;
            iframeDocument.head.appendChild(style);
          }
        } catch {
          // ไม่ระบุตัวแปรในส่วน catch เลย
          console.log(
            "Cannot access iframe document due to same-origin policy"
          );
        }
      };
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener("contextmenu", handleContextMenu);
      }
    };
  }, []);

  // ตรวจสอบว่า URL เป็น URL ที่ถูกต้องหรือไม่
  const validPdfUrl = pdfUrl.startsWith("/") ? pdfUrl : `/${pdfUrl}`;

  return (
    <div
      className={`pdf-container relative ${className}`}
      style={{ overflow: "hidden" }}
    >
      <div
        className="absolute inset-0 z-10"
        style={{ pointerEvents: "none" }}
        title="Protected Document"
      ></div>
      <iframe
        ref={iframeRef}
        src={`${validPdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
        width={width}
        height={height}
        style={{ border: "none" }}
        title="PDF Viewer"
        sandbox="allow-same-origin allow-scripts allow-forms"
      />
    </div>
  );
};

export default SecurePDFViewer;
