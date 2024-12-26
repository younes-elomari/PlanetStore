import { Box } from "@radix-ui/themes";
import { Metadata } from "next";
import CheckoutComponent from "./_components/CheckoutComponent";

const CheckoutPage = () => {

  return (
    <Box className="space-y-6 text-gray-800">
      <CheckoutComponent />
    </Box>
  );
};

// export const metadata: Metadata = {
//   title: "PlanetStore - checkout",
//   description:
//     "Welcome! PlanetStore is an online store created to provide you with an exceptional shopping experience.",
// };

export default CheckoutPage;
