import { Box, Flex, Grid, Text } from "@radix-ui/themes";
import { FaMagnifyingGlass } from "react-icons/fa6";
import ContactDetails from "./_components/ContactDetails";
import ContactForm from "./_components/ContactForm";
import { Metadata } from "next";

const ContactPage = () => {
  return (
    <Box className="space-y-6 text-gray-800">
      <Box className="space-y-3">
        <Flex align="center" gap="2">
          <FaMagnifyingGlass size={18} />
          <Text weight="medium" size="3">
            Contact
          </Text>
        </Flex>
        <Grid columns={{ initial: "1", md: "2" }} gap="4">
          <Box className="border p-4">
            <ContactForm />
          </Box>
          <ContactDetails />
        </Grid>
      </Box>
    </Box>
  );
};

export const metadata: Metadata = {
  title: "PlanetStore - contact",
  description:
    "Hello, we would be very happy to hear from you. Feel free to share what's on your mind or request a product that is not currently available on our site, and we will strive to fulfill your request as soon as possible.",
};

export default ContactPage;
