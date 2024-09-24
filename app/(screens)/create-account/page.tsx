"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import logo from "../../../public/assets/pistis_logo.png";
import { Mail, KeyRound, Eye, EyeOff, Loader2, Check } from "lucide-react";
import Link from "next/link";
import useFormStore from "../../../store/create-account";

import Fulllogo from "@/public/assets/full-logo.png";
import { urls } from "@/utils/config";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Terms from "@/components/side-comp/terms";

const SignUp = () => {
  const formStore = useFormStore();
  const [specialCharacterErr, setSpecialCharacterErr] = useState();
  const [loading, setLoading] = useState<boolean>();
  const [checkbox, setCheckbox] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const handleOverlay = () => {
    setOverlay((prev) => !prev);
  };
  // const [modal, setModal] = useState<boolean>(false);
  const router = useRouter();
  //submit function
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (formStore.password === formStore.confirm) {
        if (!containsSpecialCharacters(formStore.password)) {
          throw new Error("Password does not have special characters");
        }
        setLoading(true);
        const response = await fetch(urls.signup, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formStore.email,
            password: formStore.password,
            re_password: formStore.confirm,
          }),
        });

        if (response.ok) {
          // setModal(true);
          // router.push("/create-account/activate/[uid]");
          localStorage.setItem("email", formStore.email);
          toast.success("Check email for validation!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });
        } else {
          toast.error("This email address has been registered!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });
        }
      }
    } catch (error: any) {
      if (error.message === "Password must contain special characters") {
        setSpecialCharacterErr(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  function containsSpecialCharacters(str: string): boolean {
    const specialCharacters = /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]/;
    return specialCharacters.test(str);
  }

  return (
    <main className="md:bg-form-back bg-white h-screen w-full bg-no-repeat bg-cover relative">
      <div className="bg-white w-[100%] lg:w-[50%] h-screen rounded-none lg:rounded-tl-[40px] lg:rounded-bl-[40px] absolute right-0 flex flex-col justify-around px-5  md:px-6 lg:px-10">
        <div className="h-auto block md:hidden w-full bg-main p-2">
          <Image src={Fulllogo} alt="logo" />
        </div>
        <div className="flex justify-end">
          <Image
            src={logo}
            alt="pistis_logo"
            className="md:block hidden"
            priority
          />
        </div>
        <div className="px-2 my-10 md:my-0 md:px-0">
          <h1 className="md:text-4xl sm:text-2xl text-xl font-semibold">
            Create Account
          </h1>
          <h3 className="md:text-2xl sm:text-lg text-base">
            Let’s get you started!
          </h3>
        </div>
        <ToastContainer />
        <div className="px-2 md:px-0">
          <form onSubmit={onSubmit} className="space-y-3">
            <div>
              <label className="text-[#3E3E3E] md:text-xl sm:text-base text-sm">
                Email Address
              </label>
              <div className="relative">
                <Mail className="mr-2 absolute md:top-5 top-4 text-[#4F5B67] left-3 h-5 w-5" />
                <input
                  type="email"
                  className="py-4 bg-[#FAFAFA] w-full text-xs md:text-base placeholder:text-[#4F5B67] rounded-[6px] indent-9"
                  placeholder="example@gmail.com"
                  value={formStore.email}
                  onChange={(e) => formStore.setField("email", e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-[#3E3E3E] md:text-xl text-base sm:text-sm">
                Create Password
              </label>
              <div className="relative">
                <KeyRound className="mr-2 absolute md:top-5 top-4 text-[#4F5B67] left-3 h-5 w-5" />
                {formStore.showPassword ? (
                  <Eye
                    onClick={formStore.togglePassword}
                    className="ml-2 absolute cursor-pointer md:top-4 top-3 text-[#4F5B67] right-3 h-5 w-5"
                  />
                ) : (
                  <EyeOff
                    onClick={formStore.togglePassword}
                    className="ml-2 absolute cursor-pointer top-4 text-[#4F5B67] right-3 h-5 w-5"
                  />
                )}
                <input
                  type={formStore.showPassword ? "text" : "password"}
                  className="py-4 bg-[#FAFAFA] text-xs md:text-base  placeholder:text-[#4F5B67] rounded-[6px] indent-9 w-full"
                  placeholder="Password"
                  value={formStore.password}
                  onChange={(e) =>
                    formStore.setField("password", e.target.value)
                  }
                />
              </div>
            </div>

            <div>
              <label className="text-[#3E3E3E] md:text-xl text-base sm:text-sm">
                Confirm Password
              </label>
              <div className="relative">
                <KeyRound className="mr-2 absolute md:top-5 top-4 text-[#4F5B67] left-3 h-5 w-5" />
                {formStore.showConfirmPassword ? (
                  <Eye
                    onClick={formStore.toggleConfirmPassword}
                    className="ml-2 absolute cursor-pointer top-4 text-[#4F5B67] right-3 h-5 w-5"
                  />
                ) : (
                  <EyeOff
                    onClick={formStore.toggleConfirmPassword}
                    className="ml-2 absolute cursor-pointer top-4 text-[#4F5B67] right-3 h-5 w-5"
                  />
                )}
                <input
                  type={formStore.showConfirmPassword ? "text" : "password"}
                  className="py-4 bg-[#FAFAFA] text-xs md:text-base  placeholder:text-[#4F5B67] rounded-[6px] indent-9 w-full"
                  placeholder="Confirm Password"
                  value={formStore.confirm}
                  onChange={(e) =>
                    formStore.setField("confirm", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                checked={checkbox}
                onChange={(e) => setCheckbox(e.target.checked)}
              />
              <p className="md:text-base text-sm">
                Read and accept{" "}
                <span
                  onClick={handleOverlay}
                  className="text-main cursor-pointer font-semibold"
                >
                  terms and conditions
                </span>
              </p>
            </div>
            <p className="text-red-500 text-xs md:text-sm lg:text-base text-center">
              Password must contain special characters
            </p>

            <button
              disabled={loading || !checkbox}
              type="submit"
              className="w-full bg-[#33CC99] disabled:cursor-not-allowed disabled:bg-sub/30 disabled:text-black/30 py-4 flex justify-center items-center rounded-[8px] font-medium text-lg md:text-2xl text-black hover:text-white"
            >
              {loading ? (
                <Loader2 className="animate-spin text-white" />
              ) : (
                <>Submit</>
              )}
            </button>
            <p className="text-red-500 text-center">{specialCharacterErr}</p>
            {formStore.password !== formStore.confirm ? (
              <p className="text-red-500 text-xs md:text-sm lg:text-base text-center">
                Password and Confirm password contains different characters
              </p>
            ) : (
              <></>
            )}
          </form>
        </div>
        <div>
          <p className="text-center font-medium text-sm md:text-lg lg:text-xl">
            Already have an account?{" "}
            <Link className="text-main" href="/sign-in">
              Sign In
            </Link>
          </p>
        </div>
      </div>
      {overlay && (
        <div className="absolute flex justify-center items-center h-screen w-full bg-slate-200/25 top-0 right-0">
          <Terms handleOverlay={handleOverlay} />
        </div>
      )}
    </main>
  );
};

export default SignUp;
