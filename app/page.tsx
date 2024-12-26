import { Box } from "@radix-ui/themes";
import Categories from "./_components/Categories";
import Header from "./_components/Header";
import NewArrivals from "./_components/NewArrivals";
import ExploreProducts from "./_components/ExploreProducts";
import prisma from "@/prisma/client";
import { Metadata } from "next";

export default async function Home() {
  const trendingCategories = await prisma.category.findMany({
    take: 7,
  });

  const newProducts = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const popularProducts = await prisma.product.findMany({
    orderBy: { orderTimes: "desc" },
    take: 10,
  });

  return (
    <Box className="space-y-11">
      <Header />
      <Categories
        categories={trendingCategories}
        label="Trending Categories"
        showAllCategoriesButton={true}
      />
      <NewArrivals products={newProducts} />
      <ExploreProducts products={popularProducts} />
    </Box>
  );
}

export const metadata: Metadata = {
  title: "PlanetStore",
  description:
    "At PlanetStore, we are committed to providing you with an unparalleled shopping experience. Our online store is designed to offer the best products on the market, ensuring that you receive the highest quality goods at the most competitive prices.",
};
