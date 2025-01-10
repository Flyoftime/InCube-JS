import {
  getAddressByUserId,
  updateAddressUser,
  deleteAddressUser,
} from "./../../../../lib/prisma-service/addressService";
import { NextResponse } from "next/server";

// GET: Fetch an address by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    const address = await getAddressByUserId(id);

    if (!address) {
      return NextResponse.json(
        { success: false, message: "Address not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: address }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch address", error },
      { status: 500 }
    );
  }
}

// PUT: Update an address by ID
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const body = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    const updatedAddress = await updateAddressUser(id, body);

    if (!updatedAddress) {
      return NextResponse.json(
        { success: false, message: "Address not found or update failed" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedAddress },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update address", error },
      { status: 500 }
    );
  }
}

// DELETE: Remove an address by ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    const deletedAddress = await deleteAddressUser(id);

    if (!deletedAddress) {
      return NextResponse.json(
        { success: false, message: "Address not found or delete failed" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Address deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete address", error },
      { status: 500 }
    );
  }
}
