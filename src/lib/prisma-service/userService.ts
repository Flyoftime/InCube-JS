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
    return newDetailUser;
  } catch (error) {
    console.error("Error creating detail_user:", error);
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
    return detailUsers;
  } catch (error) {
    console.error("Error fetching detail_users:", error);
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
      console.error("Detail user not found");
    }
    return detailUser;
  } catch (error) {
    console.error("Error fetching detail_user:", error);
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
    const updatedDetailUser = await prisma.detail_user.update({
      where: { id },
      data: {
        name: data.name,
        age: data.age,
        gender: data.gender,
        contact: data.contact,
        job: data.job,
      },
    });
    return updatedDetailUser;
  } catch (error) {
    console.error("Error updating detail_user:", error);
  }
};

// Delete a detail_user by ID
export const deleteDetailUser = async (id: number) => {
  try {
    const deleteUser = await prisma.detail_user.delete({
      where: { id },
    });
    return deleteUser;
  } catch (error) {
    console.error("Error deleting detail_user:", error);
  }
};
