import prisma from "./prisma";

// Generate a new product ID
const generateProductId = (currentMaxId: number): string => {
  const nextId = currentMaxId + 1;
  return `IC${nextId.toString().padStart(4, "0")}`;
};

// Get all products
export const getAllProducts = async () => {
  try {
    return await prisma.produk.findMany();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Unable to fetch products");
  }
};

// Create a new product
export const createProduct = async (data: {
  nama: string;
  tinggi: number;
  lebar: number;
  kapasitas: number;
  telur: number;
  pass_access: string;
  price: number;
  active: "Y" | "N";
}) => {
  try {
    // Get the last product to determine the current max ID
    const lastProduct = await prisma.produk.findFirst({
      orderBy: { id: "desc" },
    });

    const currentMaxId = lastProduct ? parseInt(lastProduct.id.slice(2)) : 0;

    // Generate a new product ID
    const newId = generateProductId(currentMaxId);

    // Create and save the new product
    const newProduct = await prisma.produk.create({
      data: {
        id: newId,
        nama: data.nama,
        tinggi: data.tinggi,
        lebar: data.lebar,
        kapasitas: data.kapasitas,
        telur: data.telur,
        pass_access: data.pass_access,
        price: data.price,
        active: data.active,
        created_at: new Date(),
      },
    });

    return newProduct;
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Unable to create product");
  }
};

// Get a product by its ID
export const getProductById = async (id: string) => {
  try {
    const product = await prisma.produk.findUnique({
      where: { id },
    });

    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }

    return product;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw new Error("Unable to fetch product");
  }
};

// Update a product
export const updateProductStatus = async (
  id: string,
  data: Partial<{
    pass_access: string;
    active: "Y" | "N";
  }>
) => {
  try {
    // Update active status to "Y"
    const updatedProduct = await prisma.produk.update({
      where: { id },
      data: {
        active: "Y",
      },
    });

    return updatedProduct;
  } catch (error) {
    console.error("Error updating product status:", error);
    return { error: "Unable to update product status", status: 500 };
  }
};

// Update a product
export const updateProduct = async (
  id: string,
  data: Partial<{
    nama: string;
    tinggi: number;
    lebar: number;
    kapasitas: number;
    telur: number;
    pass_access: string;
    price: number;
    active: "Y" | "N";
  }>
) => {
  try {
    return await prisma.produk.update({
      where: { id },
      data: {
        nama: data.nama,
        tinggi: data.tinggi,
        lebar: data.lebar,
        kapasitas: data.kapasitas,
        telur: data.telur,
        pass_access: data.pass_access,
        price: data.price,
        active: data.active,
        created_at: new Date(),
      },
    });
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Unable to update product");
  }
};

// Delete a product by its ID
export const deleteProduct = async (id: string) => {
  try {
    return await prisma.produk.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Unable to delete product");
  }
};
