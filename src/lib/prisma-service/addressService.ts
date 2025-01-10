import prisma from "./prisma";

export const createAddresslUser = async (data: {
  id_user: number;
  Kecamatan?: string;
  provinsi?: string;
  Kabupaten?: string;
  Kelurahan?: string;
  Kode_pos?: string;
  alamat_lengkap?: string;
}) => {
  try {
    // Ensure all properties are correctly mapped
    const newDetailUser = await prisma.address.create({
      data: {
        id_user: data.id_user,
        Kecamatan: data.Kecamatan,
        provinsi: data.provinsi,
        Kabupaten: data.Kabupaten,
        Kelurahan: data.Kelurahan,
        Kode_pos: data.Kode_pos,
        alamat_lengkap: data.alamat_lengkap,
      },
    });
    return { success: true, data: newDetailUser };
  } catch (error) {
    console.error("Error creating detail_user:", error);
    return { success: false, error: "Failed to create detail_user" };
  }
};

export const getAddressByUserId = async (id: number) => {
  try {
    const address = await prisma.address.findFirst({
      where: {
        id_user: id,
      },
    });
    if (address) {
      return { success: true, data: address };
    } else {
      return { success: false, error: "Address not found" };
    }
  } catch (error) {
    console.error("Error fetching address:", error);
    return { success: false, error: "Failed to fetch address" };
  }
};

export const updateAddressUser = async (
  id: number,
  data: {
    Kecamatan?: string;
    provinsi?: string;
    Kabupaten?: string;
    Kelurahan?: string;
    Kode_pos?: string;
    alamat_lengkap?: string;
  }
) => {
  try {
    const updatedAddress = await prisma.address.update({
      where: {
        id,
      },
      data: {
        Kecamatan: data.Kecamatan,
        provinsi: data.provinsi,
        Kabupaten: data.Kabupaten,
        Kelurahan: data.Kelurahan,
        Kode_pos: data.Kode_pos,
        alamat_lengkap: data.alamat_lengkap,
      },
    });
    return { success: true, data: updatedAddress };
  } catch (error) {
    console.error("Error updating address:", error);
    return { success: false, error: "Failed to update address" };
  }
};

export const deleteAddressUser = async (id: number) => {
  try {
    const deletedAddress = await prisma.address.delete({
      where: {
        id,
      },
    });
    return { success: true, data: deletedAddress };
  } catch (error) {
    console.error("Error deleting address:", error);
    return { success: false, error: "Failed to delete address" };
  }
};
