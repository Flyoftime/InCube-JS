import prisma from "./prisma";

// Create a new detail_user
export const createDetailUser = async (data: {
  id_user: number;
  name?: string;
  age?: string;
  gender?: "Male" | "Female";
  contact?: string;
  job?: string;
}) => {
  try {
    const newDetailUser = await prisma.detail_user.create({
      data: {
        id_user: data.id_user,
        name: data.name,
        age: data.age,
        gender: data.gender,
        contact: data.contact,
        job: data.job,
        created_at: new Date(),
      },
    });
    return { success: true, data: newDetailUser };
  } catch (error) {
    console.error("Error creating detail_user:", error);
    return { success: false, error: "Failed to create detail_user" };
  }
};

// Get all detail_users
export const getAllDetailUsers = async () => {
  try {
    const detailUsers = await prisma.detail_user.findMany({
      include: {
        users: true, // Include related user data
      },
    });
    return { success: true, data: detailUsers };
  } catch (error) {
    console.error("Error fetching detail_users:", error);
    return { success: false, error: "Failed to fetch detail_users" };
  }
};

// Get a single detail_user by ID
export const getDetailUserById = async (id: number) => {
  try {
    const detailUser = await prisma.detail_user.findFirst({
      where: { id_user: id },
      include: {
        users: true, // Include related user data
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

// Update a detail_user by ID
export const updateDetailUser = async (
  id: number,
  data: {
    name?: string;
    age?: string;
    gender?: "Male" | "Female";
    contact?: string;
    job?: string;
  }
) => {
  try {
    const detailUser = await prisma.detail_user.findFirst({
      where: { id_user: id },
      include: {
        users: true, // Include related user data
      },
    });
    const updatedDetailUser = await prisma.detail_user.update({
      where: { id: detailUser?.id },
      data: {
        name: data.name,
        age: data.age,
        gender: data.gender,
        contact: data.contact,
        job: data.job,
      },
    });
    return { success: true, data: updatedDetailUser };
  } catch (error) {
    console.error("Error updating detail_user:", error);
    return { success: false, error: "Failed to update detail_user" };
  }
};

// Delete a detail_user by ID
export const deleteDetailUser = async (id: number) => {
  try {
    await prisma.detail_user.delete({
      where: { id },
    });
    return { success: true, message: "Detail user deleted successfully" };
  } catch (error) {
    console.error("Error deleting detail_user:", error);
    return { success: false, error: "Failed to delete detail_user" };
  }
};
