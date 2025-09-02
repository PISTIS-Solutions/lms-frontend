"use client";
import IntermediateCard from "@/components/side-comp/pricing/IntermediateCard";
import AdvanceCard from "@/components/side-comp/pricing/AdvanceCard";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { usePlanStore } from "@/store/plan-store";
import { useRouter } from "next-nprogress-bar";
import useCheckStatusStore from "@/store/checkStatus";

const PaymentPlan = () => {
  const { fetchPlans, isLoading } = usePlanStore();
  const [paymentDuration, setPaymentDuration] = useState(0);
  const router = useRouter();
  const { current_plan } = useCheckStatusStore();

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center">
      {/* Back button */}
      <button
        className="flex items-center absolute top-4 left-4 gap-x-1 text-gray-800 font-medium text-lg hover:text-main transition-colors"
        onClick={() => router.back()}
      >
        <ChevronLeft size={24} />
        <span className="hidden sm:inline">Back</span>
      </button>

      {/* Header section */}
      <section className="max-w-4xl text-center mt-12 px-6">
        <span className="bg-[#E6F6FF] rounded-full py-2 px-6 text-main text-sm md:text-base font-medium mb-6 inline-block">
          Pricing Plans
        </span>
        <h1 className="font-semibold text-2xl md:text-5xl text-gray-900 leading-tight">
          We’ve got a plan that’s perfect for you.
        </h1>
        <p className="mt-4 text-xs sm:text-sm md:text-lg text-gray-600 md:max-w-[65vw] mx-auto">
          Elevate your skills and enhance your learning experience with our
          flexible, affordable payment options tailored to fit your budget and
          learning goals. Now is the perfect time to accelerate your career
          journey!
        </p>
      </section>

      {/* Toggle payment duration (optional feature) */}
      {/* 
      <div className="flex border border-gray-300 rounded-xl p-1 mt-10 mb-8 bg-gray-50">
        <button
          className={`py-2 px-6 rounded-lg text-sm md:text-base transition-all ${
            paymentDuration === 0
              ? "bg-main text-white font-semibold shadow"
              : "text-gray-600"
          }`}
          onClick={() => setPaymentDuration(0)}
        >
          Monthly Billing
        </button>
        <button
          className={`py-2 px-6 rounded-lg text-sm md:text-base transition-all ${
            paymentDuration === 1
              ? "bg-main text-white font-semibold shadow"
              : "text-gray-600"
          }`}
          onClick={() => setPaymentDuration(1)}
        >
          Yearly (save up to 40%)
        </button>
      </div>
      */}

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-4 mt-10 pb-10">
        {current_plan === "Intermediate" ? (
          <AdvanceCard />
        ) : (
          <>
            <IntermediateCard />
            <AdvanceCard />
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentPlan;
