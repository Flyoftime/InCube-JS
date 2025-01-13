import prisma from "./prisma";

export const getAllAddress = async () => {
  try {
    const detailAddress = await prisma.address.findMany({
      include: {
        users: true, // Include related user data
      },
    });
    return detailAddress;
  } catch (error) {
    console.error("Error fetching address:", error);
  }
};

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
    return newDetailUser;
  } catch (error) {
    console.error("Error creating detail_user:", error);
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
      return address;
    } else {
      console.error("address not found");
    }
  } catch (error) {
    console.error("Error fetching address:", error);
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
    return updatedAddress;
  } catch (error) {
    console.error("Error updating address:", error);
  }
};

export const deleteAddressUser = async (id: number) => {
  try {
    const deletedAddress = await prisma.address.delete({
      where: {
        id,
      },
    });
    return deletedAddress;
  } catch (error) {
    console.error("Error deleting address:", error);
  }
};
