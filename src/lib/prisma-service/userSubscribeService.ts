import prisma from "./prisma";

// Get a single detail_user by ID
export const getDetailUserSubById = async (id: number) => {
  try {
    const detailUser = await prisma.user_subs.findMany({
      where: { id_cus: id },
      include: {
        produk: true,
        users: true,
      },
    });
    if (!detailUser) {
      return { success: false, error: "Detail user not found" };
    }
    return { success: true, data: detailUser };
  } catch (error) {
    console.error("Error fetching detail_user:", error);
    return { success: false, error: "Failed to fetch detail_user" };
  }
};
