import { Grid } from "@radix-ui/themes";
import React from "react";
import headerData from "@/app/data/headerData.json";
import HeaderPrimaryCard from "./HeaderPrimaryCard";
import HeaderSecondaryCard from "./HeaderSecondaryCard";

const Header = () => {
  return (
    <Grid columns={{ initial: "1", md: "1fr 400px" }} gap="2">
      <HeaderPrimaryCard />
      <Grid rows={{ initial: "1", md: "2" }} gap="2">
        <HeaderSecondaryCard
          heading={headerData.secondaryHeaderCard1.heading}
          subHeading={headerData.secondaryHeaderCard1.subHeading}
          img={headerData.secondaryHeaderCard1.backgroundImage}
        />
        <HeaderSecondaryCard
          heading={headerData.secondaryHeaderCard2.heading}
          subHeading={headerData.secondaryHeaderCard2.subHeading}
          img={headerData.secondaryHeaderCard2.backgroundImage}
        />
      </Grid>
    </Grid>
  );
};

export default Header;
