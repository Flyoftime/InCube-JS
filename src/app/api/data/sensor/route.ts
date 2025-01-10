import { NextResponse } from "next/server";
import { getAllSensorData } from "../../../../lib/prisma-service/sensorService";

export async function GET() {
  try {
    const data = await getAllSensorData();
    return NextResponse.json(data);
  } catch (error) {
    let errorMessage = "Unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { error: "Failed to fetch data", details: errorMessage },
      { status: 500 }
    );
  }
}
