import { Grid } from "@radix-ui/themes";
import React from "react";
import DashboardMainCard from "./DashboardMainCard";

interface Props {
  todaysOrdersCount: number;
  productsCount: number;
  categoriesCount: number;
  customersCount: number;
}

const DashboardHeaderGrid = ({
  todaysOrdersCount,
  productsCount,
  categoriesCount,
  customersCount,
}: Props) => {
  return (
    <Grid columns={{ initial: "2", md: "4" }} gap="2">
      <DashboardMainCard
        href="/dashboard/orders"
        label="Today's Orders"
        count={todaysOrdersCount}
      />
      <DashboardMainCard
        href="/dashboard/products"
        label="Products"
        count={productsCount}
      />
      <DashboardMainCard
        href="/dashboard/categories"
        label="Categories"
        count={categoriesCount}
      />
      <DashboardMainCard
        href="/dashboard/customers"
        label="Customers"
        count={customersCount}
      />
    </Grid>
  );
};

export default DashboardHeaderGrid;
