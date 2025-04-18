// src/app/documents/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, FileText } from "lucide-react";
import Link from "next/link";
import SecurePDFViewer from "../../../components/SecurePdfViewer";

interface Document {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  uploadedAt: string;
  category: string;
}

export default function PublicDocumentViewPage() {
  const params = useParams();
  const documentId = params.id as string;

  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // จำลองการเรียก API เพื่อดึงข้อมูลเอกสาร
    const fetchDocument = async () => {
      try {
        // ในกรณีจริงคุณจะเรียก API ที่นี่
        setTimeout(() => {
          // สร้างข้อมูลจำลองขึ้นอยู่กับ ID ที่มาจาก URL
          if (documentId === "1") {
            setDocument({
              id: "1",
              title: "คู่มือการใช้งานระบบ GOROLL สำหรับผู้ใช้ทั่วไป",
              description:
                "เอกสารแนะนำการใช้งานขั้นพื้นฐานสำหรับผู้ใช้งานทั่วไป ครอบคลุมฟังก์ชันการทำงานหลักทั้งหมดของระบบ",
              fileUrl: "/documents/SRS.pdf", // ตรวจสอบว่าไฟล์นี้อยู่ในโฟลเดอร์ public/documents/
              uploadedAt: "2024-04-15T10:30:00Z",
              category: "manual",
            });
          } else {
            // ถ้าไม่พบเอกสารที่มี ID ตรงกับที่ระบุ
            setDocument(null);
          }
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Error fetching document:", error);
        setLoading(false);
      }
    };

    fetchDocument();
  }, [documentId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">ไม่พบเอกสาร</h2>
          <p className="text-gray-600 mb-6">ไม่พบเอกสารตามที่ระบุ</p>
          <Link
            href="/documents"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            กลับไปยังรายการเอกสาร
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Link href="/documents" className="mr-4">
          <ChevronLeft
            size={24}
            className="text-gray-500 hover:text-gray-700"
          />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">{document.title}</h1>
      </div>

      {/* รายละเอียดเอกสาร */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <FileText className="text-blue-600" size={20} />
          </div>
          <div className="ml-3">
            <p className="text-sm text-gray-500">
              {document.category === "manual"
                ? "คู่มือการใช้งาน"
                : "นโยบายและข้อกำหนด"}
            </p>
            <p className="text-xs text-gray-400">
              อัปเดตล่าสุด:{" "}
              {new Date(document.uploadedAt).toLocaleDateString("th-TH")}
            </p>
          </div>
        </div>
        <p className="text-gray-600">{document.description}</p>
      </div>

      {/* PDF Viewer */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <SecurePDFViewer
          pdfUrl={document.fileUrl}
          height="800px"
          className="w-full"
        />
      </div>
    </div>
  );
}
