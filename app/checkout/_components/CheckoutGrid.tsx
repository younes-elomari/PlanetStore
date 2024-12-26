import { Box, Grid } from "@radix-ui/themes";
import React from "react";
import ChechoutForm from "./CheckoutForm";
import CheckoutSummary from "./CheckoutSummary";

const CheckoutGrid = () => {
  return (
    <Grid columns={{ initial: "1", md: "1fr 300px" }} gap="4">
      <Box className="border p-3">
        <ChechoutForm />
      </Box>
      <CheckoutSummary />
    </Grid>
  );
};

export default CheckoutGrid;
