import { prisma } from "@/lib/prisma";
const checkCategoryName = async (name: string) => {
  // remove spaces and replace with -
  const updatedName = name.replace(/\s+/g, "-").toLowerCase();
  const checkInPrisma = await prisma.category.findFirst({
    where: {
      id: updatedName,
    },
  });
  if (checkInPrisma) {
    const randomNumber = Math.floor(Math.random() * 1000);
    return `${updatedName}-${randomNumber}`;
  }
  return updatedName;
};

const checkProductName = async (name: string) => {
  // remove spaces and replace with -
  const updatedName = name.replace(/\s+/g, "-").toLowerCase();
  const checkInPrisma = await prisma.product.findFirst({
    where: {
      id: updatedName,
    },
  });
  if (checkInPrisma) {
    const randomNumber = Math.floor(Math.random() * 1000);
    return `${updatedName}-${randomNumber}`;
  }
  return updatedName;
};

const checkSubcategoryName = async (name: string) => {
  // remove spaces and replace with -
  const updatedName = name.replace(/\s+/g, "-").toLowerCase();
  const checkInPrisma = await prisma.subcategory.findFirst({
    where: {
      id: updatedName,
    },
  });
  if (checkInPrisma) {
    const randomNumber = Math.floor(Math.random() * 1000);
    return `${updatedName}-${randomNumber}`;
  }
  return updatedName;
};

export { checkCategoryName, checkProductName, checkSubcategoryName };
