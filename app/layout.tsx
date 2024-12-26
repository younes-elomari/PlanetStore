import "./globals.css";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import NavBar from "./_components/NavBar";
import { Box, Container, Theme } from "@radix-ui/themes";
// import Footer from "./_components/Footer";
// import QueryClientProvider from "./QueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PlanetStore",
  description:
    "At PlanetStore, we are committed to providing you with an unparalleled shopping experience. Our online store is designed to offer the best products on the market, ensuring that you receive the highest quality goods at the most competitive prices.",
  icons: {
    icon: [
      {
        url: "/planetStoreIcon.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <QueryClientProvider> */}
          <Theme appearance="light" accentColor="violet">
            <main className="px-3">
              <Container>
                {/* <NavBar /> */}
                <Box>{children}</Box>
                {/* <Footer /> */}
              </Container>
            </main>
          </Theme>
        {/* </QueryClientProvider> */}
      </body>
    </html>
  );
}
