import { createAddresslUser } from "./../../../lib/prisma-service/addressService";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      id_user,
      Kecamatan,
      provinsi,
      Kabupaten,
      Kelurahan,
      Kode_pos,
      alamat_lengkap,
    } = body;

    if (
      !id_user ||
      !Kecamatan ||
      !provinsi ||
      !Kabupaten ||
      !Kelurahan ||
      !Kode_pos ||
      !alamat_lengkap
    ) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const newAddress = await createAddresslUser(body);
    return NextResponse.json(
      { success: true, data: newAddress },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create address", error },
      { status: 500 }
    );
  }
}
