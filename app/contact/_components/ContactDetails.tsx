import { Box, Text } from "@radix-ui/themes";
import React from "react";

const ContactDetails = () => {
  return (
    <Box className="border p-4 text-gray-700 space-y-4">
      <Box className="space-y-2">
        <Text size="2" weight="medium" className="bock">
          Hello, we would be very happy to hear from you. Feel free to share
          what&apos;s on your mind or request a product that is not currently
          available on our site, and we will strive to fulfill your request as
          soon as possible.
        </Text>
        <Text dir="rtl" size="2" weight="medium" className="text-right block">
          مرحباً، سنكون سعداء جداً بالتواصل معك. يمكنك إخبارنا بما يدور في ذهنك
          حالياً أو طلب منتج غير متوفر على موقعنا، وسنسعى جاهدين لتلبية طلبك في
          أقرب وقت ممكن.
        </Text>
      </Box>
      <Box className="space-y-2">
        <Text size="2" weight="medium" className="bock">
          You only need to provide your information if you are requesting a
          product that is not listed on our site, so we can contact you and
          understand exactly what product you are looking for.
        </Text>
        <Text dir="rtl" size="2" weight="medium" className="text-right block">
          ليس عليك ملء معلوماتك إلا في حالة طلبك لمنتج غير موجود على موقعنا، حتى
          نتمكن من التواصل معك ومعرفة المنتج الذي ترغب فيه بالضبط.
        </Text>
      </Box>
      <Box className="space-y-2">
        <Text size="2" weight="medium" className="bock">
          You can write in the language you find most suitable, whether it be
          Arabic, French, or English.
        </Text>
        <Text dir="rtl" size="2" weight="medium" className="text-right block">
          يمكنك الكتابة باللغة التي تجدها مناسبة، سواء كانت العربية، الفرنسية،
          أو الإنجليزية.
        </Text>
      </Box>
    </Box>
  );
};

export default ContactDetails;
