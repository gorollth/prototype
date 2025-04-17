// src/app/documents/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Search, ChevronDown, FileText } from "lucide-react";
import Link from "next/link";

interface Document {
  id: string;
  title: string;
  description: string;
  category: string;
  uploadedAt: string;
}

export default function PublicDocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    // จำลองการเรียก API เพื่อดึงข้อมูลเอกสารสาธารณะ
    const fetchDocuments = async () => {
      try {
        // ในกรณีจริงคุณจะเรียก API ที่นี่
        setTimeout(() => {
          setDocuments([
            {
              id: "1",
              title: "คู่มือการใช้งานระบบ GOROLL สำหรับผู้ใช้ทั่วไป",
              description:
                "เอกสารแนะนำการใช้งานขั้นพื้นฐานสำหรับผู้ใช้งานทั่วไป",
              category: "manual",
              uploadedAt: "2024-04-15T10:30:00Z",
            },
            // {
            //   id: "4",
            //   title: "เอกสารนโยบายความเป็นส่วนตัว",
            //   description: "นโยบายความเป็นส่วนตัวและการใช้ข้อมูลของผู้ใช้งาน",
            //   category: "policy",
            //   uploadedAt: "2024-03-20T09:15:00Z",
            // },
            // {
            //   id: "5",
            //   title: "เอกสารข้อกำหนดและเงื่อนไขการใช้งาน",
            //   description: "ข้อกำหนดและเงื่อนไขในการใช้งานแอปพลิเคชัน GOROLL",
            //   category: "policy",
            //   uploadedAt: "2024-03-20T09:30:00Z",
            // },
          ]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching documents:", error);
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  // กรองเอกสารตามคำค้นหาและหมวดหมู่
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || doc.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">เอกสารสาธารณะ</h1>

      {/* ส่วนค้นหาและกรอง */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="ค้นหาเอกสาร..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex gap-2">
          {/* กรองตามหมวดหมู่ */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="pl-4 pr-8 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="all">ทุกหมวดหมู่</option>
              <option value="manual">คู่มือการใช้งาน</option>
              <option value="policy">นโยบายและข้อกำหนด</option>
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
          </div>
        </div>
      </div>

      {/* รายการเอกสาร */}
      {filteredDocuments.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          ไม่พบเอกสาร
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => (
            <Link key={doc.id} href={`/documents/${doc.id}`}>
              <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer h-full flex flex-col">
                <div className="p-6 flex-grow">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FileText className="text-blue-600" size={20} />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-500">
                        {doc.category === "manual"
                          ? "คู่มือการใช้งาน"
                          : "นโยบายและข้อกำหนด"}
                      </p>
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">
                    {doc.title}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {doc.description}
                  </p>
                </div>
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    อัปเดตล่าสุด:{" "}
                    {new Date(doc.uploadedAt).toLocaleDateString("th-TH")}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
