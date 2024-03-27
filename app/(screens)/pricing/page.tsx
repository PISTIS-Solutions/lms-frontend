import React from "react";
import Image from "next/image";

import logo from "../../../public/assets/pistis_logo.png";
import PricingCard from "@/components/side-comp/pricing-card";
import PaidPricing from "@/components/side-comp/paid-pricing";

const Pricing = () => {
  return (
    // <main className="bg-form-back h-screen w-full bg-no-repeat bg-cover relative">
    //   <div className="bg-white w-[100%] sm:w-[50%] h-screen rounded-none md:rounded-tl-[40px] md:rounded-bl-[40px] absolute right-0 flex flex-col justify-around px-10">
    //     <div className="absolute top-5 right-3">
    //       <Image src={logo} alt="pistis_logo" className="" priority />
    //     </div>
    //     <div className=" mt-10">
    //       <h1 className="md:text-4xl sm:text-2xl text-xl font-semibold">
    //         Choose Plan
    //       </h1>

    //       <h3 className="md:text-2xl sm:text-lg text-base">
    //         Select the right option that suits your learning journey
    //       </h3>
    //     </div>
    //     <div className="flex items-center justify-between gap-x-2">
    //       <PricingCard />
    //       <PaidPricing />
    //     </div>
    //   </div>
    // </main>
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
