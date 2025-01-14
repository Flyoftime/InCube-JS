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
      console.error("Error user subscription not found");
    }
    return detailUser;
  } catch (error) {
    console.error("Error fetching detail_user:", error);
  }
};
