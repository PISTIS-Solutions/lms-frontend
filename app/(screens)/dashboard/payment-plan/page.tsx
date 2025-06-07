"use client";
import IntermediateCard from "@/components/side-comp/pricing/IntermediateCard";
import BeginnerCard from "@/components/side-comp/pricing/BeginnerCard";
import AdvanceCard from "@/components/side-comp/price/AdvancedCard";
import { ChevronLeft } from "lucide-react";
import PlanNav from "@/components/side-comp/pricing/PlanNav";
import { useEffect, useState } from "react";
import { usePlanStore } from "@/store/plan-store";
import { useRouter } from "next-nprogress-bar";

const PaymentPlan = () => {
  const { fetchPlans, isLoading } = usePlanStore();
  const [paymentDuration, setPaymentDuration] = useState(0);
  const router = useRouter();

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);



  return (
    <div className="w-full min-h-screen bg-white flex justify-center items-center flex-col">
      {/* <PlanNav /> */}
      <div className="max-w-screen-xl px-6 mt-6">
        <button
          className="flex items-center outline-none gap-x-1 text-[#2E2E2E] font-medium text-lg"
          onClick={() => router.back()}
        >
          <ChevronLeft size={24} /> Pricing Plan
        </button>
        <section className="text-center text-black flex justify-center items-center flex-col pt-5 pb-10 mx-auto mt-6">
          <span className="bg-[#E6F6FF] rounded-full py-2 px-6 text-main mb-8">
            Vertical draft ellipse connection draft
          </span>
          <h1 className="font-semibold pb-2 md:pb-5 text-xl sm:text-xl md:text-5xl">
            We’ve got a plan that’s perfect for you.
          </h1>
          <p className="md:max-w-[65vw] max-w-full md:text-lg sm:text-sm text-xs text-[#484848]">
            Elevate your skills and enhance your learning experience with our
            flexible and affordable payment options tailored to fit your budget
            and learning plans. Now is the perfect time to accelerate
            your career journey!
          </p>
        </section>

        {/* <section className="flex border rounded-[10px] p-[6px] w-fit items-center border-[#DADADA] mx-auto mb-14">
          <button
            className={
              "py-4 text-sm lg:text-base rounded-[10px] transition-all duration-300 ease-in-out  " +
              (paymentDuration === 0
                ? "bg-[#2FBC8D] px-[37px] font-semibold text-white shadow-[0px_0px_10px_0px_#00000040]"
                : "text-[#666666] font-medium px-4")
            }
            onClick={() => setPaymentDuration(0)}
          >
            Monthly Billing
          </button>
          <button
            className={
              "py-4 text-sm lg:text-base rounded-[10px] transition-all duration-300 ease-in-out  " +
              (paymentDuration === 1
                ? "bg-[#2FBC8D] px-[37px] font-semibold text-white shadow-[0px_0px_10px_0px_#00000040]"
                : "text-[#666666] font-medium px-4")
            }
            onClick={() => setPaymentDuration(1)}
          >
            Yearly (save up to 40%)
          </button>
        </section> */}

        <div className="flex flex-wrap items-center justify-center pb-5 gap-2 md:justify-between">
          {/* <BeginnerCard /> */}
          <IntermediateCard />
          <AdvanceCard />
        </div>
      </div>
    </div>
  );
};

export default PaymentPlan;
