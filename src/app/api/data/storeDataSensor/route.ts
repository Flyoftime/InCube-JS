import { NextResponse } from "next/server";
import { createSensorData } from "../../../../lib/prisma-service/sensorService";

export async function GET(req: Request) {
  // Ambil query string dari URL (setelah ?)
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);

  const produk = searchParams.get("produk");
  const temperature = searchParams.get("temperature");
  const humidity = searchParams.get("humidity");
  const gas = searchParams.get("gas");
  const fan_status = searchParams.get("fan_status");
  const lamp_status = searchParams.get("lamp_status");

  // Validasi jika parameter yang diperlukan tidak ada
  if (
    !produk ||
    !temperature ||
    !humidity ||
    !gas ||
    !fan_status ||
    !lamp_status
  ) {
    return NextResponse.json(
      {
        status: 400,
        success: false,
        message: "Missing required query parameters",
      },
      { status: 400 }
    );
  }

  try {
    // Parsing dan validasi input
    const temp = parseFloat(temperature);
    const hum = parseFloat(humidity);
    const gasValue = parseFloat(gas);

    if (isNaN(temp) || isNaN(hum) || isNaN(gasValue)) {
      return NextResponse.json(
        {
          status: 400,
          success: false,
          message: "Invalid input data",
        },
        { status: 400 }
      );
    }

    if (
      !["ON", "OFF"].includes(fan_status) ||
      !["ON", "OFF"].includes(lamp_status)
    ) {
      return NextResponse.json(
        {
          status: 400,
          success: false,
          message: "Invalid fan or lamp status",
        },
        { status: 400 }
      );
    }

    // Simpan data sensor ke database
    const data = await createSensorData(
      produk,
      temp,
      hum,
      gasValue,
      fan_status.toUpperCase() as "ON" | "OFF",
      lamp_status.toUpperCase() as "ON" | "OFF"
    );

    return NextResponse.json({
      status: 201,
      success: true,
      message: "Sensor data created successfully",
      data,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: 500,
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
