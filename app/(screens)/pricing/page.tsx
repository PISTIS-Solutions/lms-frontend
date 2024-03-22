import React from "react";
import Image from "next/image";

import logo from "../../../public/assets/pistis_logo.png";
import PricingCard from "@/components/side-comp/pricing-card";
import PaidPricing from "@/components/side-comp/paid-pricing";

const Pricing = () => {
  return (
    <main className="bg-form-back h-screen w-full bg-no-repeat bg-cover relative">
      <div className="bg-white w-[100%] sm:w-[50%] h-screen rounded-none md:rounded-tl-[40px] md:rounded-bl-[40px] absolute right-0 flex flex-col justify-around px-10">
        <div className="absolute top-5 right-3">
          <Image src={logo} alt="pistis_logo" className="" priority />
        </div>
        <div className=" mt-10">
          <h1 className="md:text-4xl sm:text-2xl text-xl font-semibold">
            Choose Plan
          </h1>

          <h3 className="md:text-2xl sm:text-lg text-base">
            Select the right option that suits your learning journey
          </h3>
        </div>
        <div className="flex items-center justify-between gap-x-2">
          <PricingCard />
          <PaidPricing />
        </div>
      </div>
    </main>
  );
};

export default Pricing;
