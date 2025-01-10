import { getDataSensorByIdProduct } from "@/lib/prisma-service/sensorService";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  if (!id) {
    return NextResponse.json(
      { success: false, message: "Invalid product id" },
      { status: 400 }
    );
  }

  try {
    const result = await getDataSensorByIdProduct(id);
    if (!result || !result.data || result.data.length === 0) {
      return NextResponse.json(
        { success: false, message: "product id not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(result.data);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch data sensor", error },
      { status: 500 }
    );
  }
}
