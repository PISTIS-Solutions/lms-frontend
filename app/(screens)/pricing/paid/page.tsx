import React from "react";

import Image from "next/image";
import logo from "@/public/assets/pistis_logo.png";
import paid from "@/public/assets/paid.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PaidPlan = () => {
  return (
    <main className="bg-form-back h-screen w-full bg-no-repeat bg-cover relative">
      <div className="bg-white w-[100%] sm:w-[50%] h-screen rounded-none md:rounded-tl-[40px] md:rounded-bl-[40px] absolute right-0 flex flex-col justify-center px-10">
        <div className="absolute top-5 right-3">
          <Image src={logo} alt="pistis_logo" className="" priority />
        </div>
        <div className="flex justify-center">
          <Image src={paid} alt="paid" />
        </div>
        <div>
          <p className="text-[#1A1A1A] text-2xl text-center">
            Make payment into{" "}
            <strong>
              THE PISTIS TECH HUB (6366146872, MONIEPOINT MFB), mail payment
              receipt to learning@pistis.solution
            </strong>{" "}
            for payment confirmation. <br /> <br />
            Your payment will be confirmed shortly and your plan will get
            upgraded
          </p>
        </div>
        <Link href="/create-account">
          <Button className="w-full hover:text-white bg-sub hover:bg-main text-black font-semibold py-2 my-4">
            Done
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default PaidPlan;
