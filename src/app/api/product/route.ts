import { NextResponse } from "next/server";
import {
  createProduct,
  getAllProducts,
} from "@/lib/prisma-service/productService";

export async function GET() {
  try {
    const product = await getAllProducts();
    return NextResponse.json({ success: true, data: product }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch product", error },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      nama,
      tinggi,
      lebar,
      kapasitas,
      telur,
      pass_access,
      price,
      active,
    } = body;

    // Validasi semua field wajib
    if (
      !nama ||
      !tinggi ||
      !lebar ||
      !kapasitas ||
      !telur ||
      !pass_access ||
      price === undefined ||
      active === undefined
    ) {
      return NextResponse.json(
        { success: false, message: "field are required" },
        { status: 400 }
      );
    }
    // Validasi tipe data (opsional)
    if (typeof tinggi !== "number" || tinggi <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Height (tinggi) must be a positive number",
        },
        { status: 400 }
      );
    }
    // Validasi tipe data (opsional)
    if (typeof lebar !== "number" || lebar <= 0) {
      return NextResponse.json(
        { success: false, message: "weight (lebar) must be a positive number" },
        { status: 400 }
      );
    }

    const productData = await createProduct(body);
    return NextResponse.json(
      { success: true, data: productData },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create user", error },
      { status: 500 }
    );
  }
}
