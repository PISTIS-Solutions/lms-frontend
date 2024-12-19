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
          className="absolute md:top-3 top-0 right-0 md:right-3"
        />
        <div className="text-center text-white flex justify-center items-center flex-col h-[35vh]">
          <h1 className="font-semibold pb-5 text-xl sm:text-xl md:text-4xl">
            Find the right plan for you
          </h1>
          <p className="md:max-w-[60vw] max-w-full md:text-base sm:text-sm text-xs ">
            Make payment into{" "}
            <span className="  font-semibold">
              THE PISTIS TECH HUB (6366146872, MONIEPOINT MFB)
            </span>
            ,send an email with payment receipt, full name and registered email
            address to{" "}
            <span className="font-semibold">learning.pististechub@gmail.com</span> for
            payment confirmation. Upon confirmation, your account will be
            activated within 5 minutes.
          </p>
        </div>
      </div>
      <div className="w-full h-[42px] bg-main">
        <p className="text-center text-white md:pt-3 pt-1 text-xs md:text-base font-medium">
          Send a mail to learning.pististechub@gmail.com for installmental payment plan
        </p>
      </div>
      <div className="flex flex-wrap mt-4 md:mt-0 gap-y-4 md:gap-y-0 items-center justify-center gap-x-10 h-[80vh]">
        <PricingCard bool={true} />
        <PaidPricing bool={true} />
      </div>
    </main>
  );
};

export default Pricing;
