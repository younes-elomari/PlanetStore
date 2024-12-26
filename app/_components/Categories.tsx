import { Box, Flex, Text } from "@radix-ui/themes";
import { TbCategory2 } from "react-icons/tb";
import { GoChevronRight } from "react-icons/go";
import Link from "next/link";
import { Category } from "@prisma/client";
import CategoryCard from "./CategoryCard";

interface Props {
  categories: Category[];
  label: string;
  showAllCategoriesButton: boolean;
}

const Categories = ({ categories, label, showAllCategoriesButton }: Props) => {
  return (
    <Box className="space-y-3 text-gray-700">
      <Flex align="center" gap="2" justify="between">
        <Flex align="center" gap="2">
          <TbCategory2 size={18} />
          <Text weight="medium" size="3">
            {label}
          </Text>
        </Flex>
        {showAllCategoriesButton && (
          <Link href="/shop">
            <Flex
              align="center"
              gap="2"
              className="cursor-pointer hover:text-gray-900 transition"
            >
              <Text weight="medium" size="2">
                All Categories
              </Text>
              <GoChevronRight size={15} />
            </Flex>
          </Link>
        )}
      </Flex>
      <Flex align="center" gap="3" className="flex-wrap">
        {categories?.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </Flex>
    </Box>
  );
};

export default Categories;
