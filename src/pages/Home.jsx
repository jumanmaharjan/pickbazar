import React from "react";
import HomeBanner from "./homeComponents/HomeBanner";
import HomeVoucher from "./homeComponents/HomeVoucher";
import HomeCategory from "./homeComponents/HomeCategory";
import HomeBestSell from "./homeComponents/HomeBestSell";

function Home() {
  return (
    <>
      <main>
        <HomeBanner />
        <HomeVoucher />
        <HomeCategory />
        <HomeBestSell />
      </main>
    </>
  );
}

export default Home;
