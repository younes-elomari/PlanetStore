"use client";
import { Box, Heading } from "@radix-ui/themes";
import { Category } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  category: Category;
}

const CategoryCard = ({ category }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategory = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.set("category", category.slug);
    router.push("shop?" + params.toString());
  };

  return (
    <Box
      onClick={() => handleCategory()}
      className="w-28 md:w-32 border cursor-pointer hover:bg-gray-100 transition"
    >
      <div className="h-[120px] w-full overflow-hidden">
        <img
          src={category.iconBackground || "/no-image-placeholder.webp"}
          alt={category.slug}
          className="object-cover w-full h-full"
        />
      </div>
      <Heading size="2" className="text-center p-2">
        {category.name}
      </Heading>
    </Box>
  );
};

export default CategoryCard;
