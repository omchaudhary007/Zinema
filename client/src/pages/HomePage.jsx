import React from "react";
import HeroBanner from "../components/Homepage/HeroBanner";
import NowShowing from "../components/Homepage/NowShowing";
import ComingSoon from "../components/Homepage/ComingSoon";
import TheaterLocations from "../components/Homepage/TheaterLocations";
import Promotional from "../components/Homepage/Promotional";

const HomePage = () => {
  return (
    <div>
      <HeroBanner />
      <NowShowing />
      <ComingSoon />
      <TheaterLocations />
      <Promotional />
    </div>
  );
};

export default HomePage;
