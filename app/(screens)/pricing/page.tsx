import React from "react";
import Image from "next/image";

import logo from "../../../public/assets/pistis_logo.png";
import PricingCard from "@/components/side-comp/pricing-card";
import PaidPricing from "@/components/side-comp/paid-pricing";

const Pricing = () => {
  return (
    <main className="h-screen">
      <div className="h-[35vh] bg-cover bg-no-repeat relative bg-pricingBack w-full">
        <Image
          alt="pistis-logo"
          src={logo}
          className="absolute top-3 right-3"
        />
        <div className="text-center text-white flex justify-center items-center flex-col h-[35vh]">
          <h1 className="font-semibold pb-5 text-4xl">
            Find the right plan for you
          </h1>
          <p className="max-w-[60vw]">
            Make payment into{" "}
            <span className="font-semibold">
              THE PISTIS TECH HUB (6366146872, MONIEPOINT MFB)
            </span>
            , mail payment receipt to{" "}
            <span className="font-semibold">learning@pistis.solution</span> for
            payment confirmation.
          </p>
        </div>
      </div>
        <div className="w-full h-[42px] bg-main">
          <p className="text-center text-white pt-3 font-medium">
            Send a mail to learning@pistis.solution for installmental payment
            plan
          </p>
        </div>
      <div className="flex items-center justify-center gap-x-10 h-[80vh]">
        <PricingCard />
        <PaidPricing />
      </div>
    </main>
  );
};

export default Pricing;
