import React from "react";
import HomeBanner from "./homeComponents/HomeBanner";
import HomeVoucher from "./homeComponents/HomeVoucher";
import HomeCategory from "./homeComponents/HomeCategory";

function Home() {
  return (
    <>
      <main>
        <HomeBanner />
        <HomeVoucher />
        <HomeCategory />
      </main>
      <div className="container">home</div>
    </>
  );
}

export default Home;
