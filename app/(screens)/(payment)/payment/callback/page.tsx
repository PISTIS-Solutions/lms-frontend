"use client";
import NavigationBar from "@/components/side-comp/nav";
import { baseURL } from "@/utils/config";
import axios from "axios";
import { CheckCircle, ChevronLeft, Loader2, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";

const PaymentVerification = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

//   const [status, setStatus] = useState<string | null>(null);
  const [txRef, setTxRef] = useState<string | null>(null);
//   const [transactionId, setTransactionId] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setTxRef(params.get("reference"));
  }, []);

  const transactionProcess = async () => {
    if (!txRef) return;

    try {
      const response = await axios.get(
        `${baseURL}/subscriptions/payment/callback/${txRef}`,
      );

        console.log(response, "payment");
      if (response.status === 200) {
        toast.success("Payment Successful!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
        setPaymentSuccess(true);
      } else {
        toast.error("Something went wrong!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });

        setPaymentSuccess(false);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
      });
      setPaymentSuccess(false);
    } finally {
      setLoading(false); // Only stop loading after processing
    }
  };

  useEffect(() => {
    if ( txRef) {
      transactionProcess();
    }
  }, [txRef]);

  return (
    <div className="pt-24">
      {/* <NavigationBar/> */}
      <ToastContainer />
      <button
        className="flex items-center outline-none gap-x-1 text-[#2E2E2E] font-medium text-lg"
        onClick={() => router.push("/pricing")}
      >
        <ChevronLeft size={24} /> Pricing Plan
      </button>
      <div className="h-screen p-2">
        

        <div className="flex flex-col items-center justify-center min-h-[70%]">
          {/* Always show loading first */}
          {loading ? (
            <div className="flex flex-col items-center">
              <Loader2 className="animate-spin text-gray-500 w-12 h-12" />
              <p className="text-gray-700 text-lg mt-3">
                Processing Transaction...
              </p>
            </div>
          ) : paymentSuccess ? (
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
              {/* Success UI */}
              <CheckCircle className="text-green-500 w-16 h-16 mx-auto animate-bounce" />
              <h2 className="text-2xl font-semibold text-green-600 mt-4">
                Payment Successful!
              </h2>
              <p className="text-gray-700 mt-2">
                Your transaction was processed successfully.
              </p>
              <button
                onClick={() => router.push("/create-account")}
                className="mt-6 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
              >
                Go to sign up
              </button>
            </div>
          ) : (
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
              {/* Failure UI */}
              <XCircle className="text-red-500 w-16 h-16 mx-auto animate-pulse" />
              <h2 className="text-2xl font-semibold text-red-600 mt-4">
                Payment Failed!
              </h2>
              <p className="text-gray-700 mt-2">
                Something went wrong with your transaction.
              </p>
              <button
                onClick={() => router.push("/pricing")}
                className="mt-6 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
              >
                Go back!
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentVerification;
