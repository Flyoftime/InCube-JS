import prisma from "./prisma";

export const createSensorData = async (
  id_produk: string,
  suhu: number,
  humid: number,
  gas: number,
  fan: "ON" | "OFF",
  lampu: "ON" | "OFF"
) => {
  return prisma.data_produk.create({
    data: {
      id_produk,
      suhu,
      humid,
      gas,
      fan,
      lampu,
      ts: new Date(),
    },
  });
};

export const getAllSensorData = async () => {
  return prisma.data_produk.findMany({
    orderBy: {
      ts: "desc", // Mengurutkan data berdasarkan timestamp (opsional)
    },
  });
};

export const getDataSensorByIdProduct = async (id: string) => {
  try {
    const dataSensor = await prisma.data_produk.findMany({
      where: { id_produk: id },
      orderBy: {
        ts: "desc", // Mengurutkan data berdasarkan timestamp (opsional)
      },
    });
    if (!dataSensor) {
      return { success: false, error: "data sensor not found" };
    }
    return { success: true, data: dataSensor };
  } catch (error) {
    console.error("Error fetching sensor:", error);
    return { success: false, error: "Failed to fetch sensor" };
  }
};
