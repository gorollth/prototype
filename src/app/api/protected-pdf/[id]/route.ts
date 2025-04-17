// src/app/api/protected-pdf/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getServerSession } from "next-auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // ดึง ID จาก params
    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { message: "Invalid document ID" },
        { status: 400 }
      );
    }

    // ตรวจสอบ session หรือสิทธิ์การเข้าถึง
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // ตรวจสอบว่าผู้ใช้มีสิทธิ์เข้าถึงเอกสาร ID นี้หรือไม่
    const hasAccess = await checkUserDocumentAccess(session.user.id, id);
    if (!hasAccess) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // ตรวจสอบ Referer
    const referer = request.headers.get("referer") || "";
    const validDomain = "https://yourdomain.com"; // แก้ไขเป็นโดเมนของคุณ
    if (!referer.startsWith(validDomain)) {
      return NextResponse.json({ message: "Invalid referer" }, { status: 403 });
    }

    // พาธของไฟล์ PDF
    const filePath = path.join(
      process.cwd(),
      "private",
      "documents",
      `${id}.pdf`
    );

    // ตรวจสอบว่าไฟล์มีอยู่จริงหรือไม่
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { message: "Document not found" },
        { status: 404 }
      );
    }

    // อ่านไฟล์
    const pdfFile = fs.readFileSync(filePath);

    // สร้าง Response และตั้งค่า headers
    const response = new NextResponse(pdfFile);
    response.headers.set("Content-Type", "application/pdf");
    response.headers.set(
      "Content-Disposition",
      'inline; filename="protected-document.pdf"'
    );
    response.headers.set("Content-Length", pdfFile.length.toString());
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    response.headers.set("Cross-Origin-Resource-Policy", "same-origin");

    return response;
  } catch (error) {
    console.error("Error serving PDF:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// ฟังก์ชันจำลองการตรวจสอบสิทธิ์การเข้าถึงเอกสาร
async function checkUserDocumentAccess(
  userId: string,
  documentId: string
): Promise<boolean> {
  // ในสถานการณ์จริง คุณควรตรวจสอบกับฐานข้อมูล
  return true;
}
