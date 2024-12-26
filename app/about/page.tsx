import { Box, Text } from "@radix-ui/themes";
import { Metadata } from "next";
import React from "react";

const AboutPage = () => {
  return (
    <Box className="space-y-4">
      <Box className="space-x-2 text-gray-700">
        <Text size="3" weight="medium" className="block">
          Welcome! Tamedoult is an online store created to provide you with an
          exceptional shopping experience.
        </Text>
        <Text size="3" weight="medium" dir="rtl" className="block">
          مرحباً بكم في تامدولت، موقع التسوق الإلكتروني الذي أنشئ خصيصاً لتقديم
          تجربة تسوق رائعة لكم.
        </Text>
      </Box>
      <Box className="space-x-2 text-gray-700">
        <Text size="3" weight="medium" className="block">
          We always strive to offer the best and highest quality products,
          taking into account the manufacturing company and price, aiming to
          provide excellent quality at a fair price.
        </Text>
        <Text size="3" weight="medium" dir="rtl" className="block">
          نحن نسعى دائماً لتقديم أفضل المنتجات ذات الجودة العالية، مع مراعاة
          الشركة المصنعة والأسعار، لنضمن لكم أعلى جودة بأفضل سعر ممكن.
        </Text>
      </Box>
      <Box className="space-x-2 text-gray-700">
        <Text size="3" weight="medium" className="block">
          We offer a quick response service to customer calls and messages
          received through social media, especially WhatsApp. All of this is to
          earn your satisfaction.
        </Text>
        <Text size="3" weight="medium" dir="rtl" className="block">
          نوفر خدمة رد سريعة على اتصالات العملاء والرسائل التي تصلنا عبر وسائل
          التواصل الاجتماعي، خاصةً تطبيق واتساب، كل هذا من أجل كسب رضاكم.
        </Text>
      </Box>
    </Box>
  );
};

// export const metadata: Metadata = {
//   title: "PlanetStore - about",
//   description:
//     "Welcome! PlanetStore is an online store created to provide you with an exceptional shopping experience.",
// };

export default AboutPage;
