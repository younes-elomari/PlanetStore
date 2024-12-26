import React, { ReactNode } from "react";
import DashboardNavBar from "./_components/DashboardNavBar";
import { Box } from "@radix-ui/themes";

interface Props {
  children: ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <Box className="border p-3 space-y-4">
      <DashboardNavBar />
      <Box className="border p-3 ">{children}</Box>
    </Box>
  );
};

export default DashboardLayout;
