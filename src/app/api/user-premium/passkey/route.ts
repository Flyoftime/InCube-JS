import { NextResponse } from "next/server";
import prisma from "@/lib/prisma-service/prisma";
import { updateProductStatus } from "@/lib/prisma-service/productService";
import { Message } from "paho-mqtt";

export async function PUT(req: Request) {
  try {
    const { id, pass_access } = await req.json();
    // Check if pass_access matches
    const product = await prisma.produk.findUnique({
      where: { id },
    });

    // Validasi input
    if (!id || !pass_access) {
      return NextResponse.json(
        { success: false, message: "id and pass_access are required" },
        { status: 400 }
      );
    }

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    if (product.pass_access !== pass_access) {
      return NextResponse.json(
        { success: false, message: "pass_access not match" },
        { status: 401 }
      );
    }

    // Panggil fungsi updateProductStatus
    const updatedProduct = await updateProductStatus(id, { pass_access });

    return NextResponse.json(
      {
        success: true,
        message: "Product status updated successfully",
        data: updatedProduct,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in request:", error.message);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
