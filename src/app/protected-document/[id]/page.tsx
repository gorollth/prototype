// src/app/protected-document/page.tsx
import ProtectedPdfViewer from "@/components/ProtectedPdfViewer";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProtectedDocumentPage() {
  // เช็ค session ที่ server-side
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">เอกสารลับ</h1>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <p className="text-yellow-700">
          เอกสารนี้มีการป้องกันการคัดลอกและดาวน์โหลด กรุณาอย่าเผยแพร่เนื้อหานี้
        </p>
      </div>

      {/* Client Component */}
      <ProtectedPdfViewer
        url="/api/protected-pdf/12345"
        watermark={`CONFIDENTIAL - ${session.user.email}`}
        totalPages={10}
      />
    </main>
  );
}
