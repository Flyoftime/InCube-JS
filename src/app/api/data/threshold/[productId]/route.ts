import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "http://172.20.10.2/setThreshold";

export async function GET(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  // Ambil parameter query string dari URL
  const { searchParams } = new URL(req.url);
  const minThreshold = searchParams.get("minThreshold");
  const maxThreshold = searchParams.get("maxThreshold");

  // Validasi parameter
  if (!minThreshold || !maxThreshold) {
    return NextResponse.json(
      { message: "Missing parameters" },
      { status: 400 }
    );
  }

  try {
    const ESP32_URL = `${BASE_URL}/${params.productId}`;
    console.log(params.productId);

    const response = await axios.get(ESP32_URL, {
      params: { minThreshold, maxThreshold },
    });

    // Kirim respons sukses menggunakan NextResponse
    return NextResponse.json({ message: response.data }, { status: 200 });
  } catch (error: any) {
    console.error(error.message);

    // Kirim respons gagal menggunakan NextResponse
    return NextResponse.json(
      { message: "Error controling threshold" },
      { status: 500 }
    );
  }
}