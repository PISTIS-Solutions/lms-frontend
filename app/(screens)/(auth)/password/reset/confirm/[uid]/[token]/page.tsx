"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import logo from "@/public/assets/pistis_logo.png";
import { Mail, KeyRound, Eye, EyeOff, Loader2, Info } from "lucide-react";
import useForgotPassStore from "@/store/forgot-password";
import { urls } from "@/utils/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bg from "@/public/assets/auth_bg.webp";

const NewPassword = () => {
  const passwordStore = useForgotPassStore();
  const params = useParams<{ uid: any; token: any }>();
  const router = useRouter();

  const [specialCharacterErr, setSpecialCharacterErr] = useState();
  const [loading, setLoading] = useState<boolean>();
  const [modal, setModal] = useState<boolean>(false);

  //submit function
  const onSubmitChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (passwordStore.password === passwordStore.confirm) {
        if (!containsSpecialCharacters(passwordStore.password)) {
          throw new Error("Password must contain special characters");
        }
        setLoading(true);
        const response = await fetch(urls.changePassword, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: params.uid,
            token: params.token,
            new_password: passwordStore.password,
            re_new_password: passwordStore.confirm,
          }),
        });
        if (response.ok) {
          toast.success("Password changed Successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });
          // setModal(true);
          // router.push("/create-account/activate/[uid]");
        } else {
          // setModal(false);
        }
      }
    } catch (error: any) {
      setSpecialCharacterErr(error.message);
    } finally {
      setLoading(false);
    }
  };
  function containsSpecialCharacters(str: string): boolean {
    const specialCharacters = /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]/;
    return specialCharacters.test(str);
  }

  return (
    <main className=" bg-white min-h-screen w-full relative flex">
      <ToastContainer />

      <div className="hidden h-full lg:block    lg:p-10 lg:pr-0 lg:w-[51.9%] sticky top-0 lg:h-screen">
        <div className="relative mx-auto w-fit h-full ">
          <Image
            src={bg}
            alt="auth image"
            className="object-contain  2xl:max-w-[708px] h-full"
          />
          <div className="absolute bottom-0 text-white  m-10 max-w-[80%] px-6 border-l-2 border-white">
            <p className="font-semibold text-[32px] leading-[38.4px] mb-2">
              Ipsum list layout align italic component project thumb
            </p>
            {/* TODO: change font */}
            <p className="">
              Outline share italic underline clip. Frame invite export vertical
              select device. Underline ellipse outline figma follower. Undo
              selection select arrow share prototype component list. Arrow undo
              scale prototype boolean.Outline share italic underline clip. Frame
              invite export vertical select device.{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center  lg:w-[48.06%]  lg:overflow-auto w-full px-4 lg:px-0">
        <div className="space-y-6 w-full lg:max-w-[75%]">
          <div className="flex justify-end">
            <Image src={logo} alt="pistis_logo" className="" priority />
          </div>
          <div className="">
            <h1 className="text-[32px] font-bold text-main">Reset Password</h1>
            <h3 className="text-[#828282]">
              Create a safe and secured password
            </h3>
          </div>
          <div>
            <form
              onSubmit={onSubmitChangePassword}
              className="space-y-2 mt-5 lg:mt-10"
            >
              <div className="space-y-2">
                <label className="text-[#2E2E2E] " htmlFor="password">
                  {" "}
                  Create Password
                </label>

                <div className="h-[50px] flex items-center bg-[#FAFAFA] px-[14px] gap-3 rounded-[6px] border border-[#DADADA]">
                  <div className="border-[#DADADA] h-[70%] border-r-[1.5px] pr-3 items-center flex">
                    <KeyRound className=" text-[#666666] h-5 w-5" />
                  </div>
                  <input
                    type={passwordStore.showPassword ? "text" : "password"}
                    className="outline-none bg-transparent  placeholder:text-[#9F9F9F] w-full"
                    placeholder="Password"
                    value={passwordStore.password}
                    onChange={(e) =>
                      passwordStore.setField("password", e.target.value)
                    }
                    id="password"
                  />
                  <div className="hover:cursor-pointer">
                    {passwordStore.showPassword ? (
                      <Eye
                        onClick={passwordStore.togglePassword}
                        className=" text-[#666666] h-5 w-5"
                      />
                    ) : (
                      <EyeOff
                        onClick={passwordStore.togglePassword}
                        className=" text-[#666666] h-5 w-5"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  className="text-[#2E2E2E] mb-1 "
                  htmlFor="confirm-password"
                >
                  Confirm password
                </label>
                <div className="h-[50px] flex items-center bg-[#FAFAFA] px-[14px] gap-3 rounded-[6px] border border-[#DADADA]">
                  <div className="border-[#DADADA] h-[70%] border-r-[1.5px] pr-3 items-center flex">
                    <KeyRound className=" text-[#666666] h-5 w-5" />
                  </div>
                  <input
                    type={
                      passwordStore.showConfirmPassword ? "text" : "password"
                    }
                    className="outline-none bg-transparent  placeholder:text-[#9F9F9F] w-full"
                    placeholder="Confirm Password"
                    value={passwordStore.confirm}
                    onChange={(e) =>
                      passwordStore.setField("confirm", e.target.value)
                    }
                    id="confirm-password"
                  />
                  <div className="hover:cursor-pointer">
                    {passwordStore.showConfirmPassword ? (
                      <Eye
                        onClick={passwordStore.toggleConfirmPassword}
                        className=" text-[#666666] h-5 w-5"
                      />
                    ) : (
                      <EyeOff
                        onClick={passwordStore.toggleConfirmPassword}
                        className=" text-[#666666] h-5 w-5"
                      />
                    )}
                  </div>
                </div>
              </div>
              <span className="text-xs text-[#9F9F9F] flex items-center gap-x-[6px] mt-1">
                <Info className="text-[#9F9F9F] rotate-180 w-[14px] h-[14px]" />
                Password must contain special character
              </span>

              <div>
                <p className="text-red-500 text-sm text-center">
                  {specialCharacterErr}
                </p>
                {passwordStore.password != passwordStore.confirm ? (
                  <p className="text-red-500 text-sm text-center">
                    Password and Confirm password contains different characters
                  </p>
                ) : (
                  <></>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-main py-4 flex justify-center items-center rounded-[8px] text-white h-[50px] hover:bg-main/90 font-medium !mt-8 lg:!mt-10"
              >
                {loading ? (
                  <Loader2 className="animate-spin text-white" />
                ) : (
                  <>Submit</>
                )}
              </button>
            </form>
          </div>
          <div></div>
        </div>
      </div>
    </main>
  );
};

export default NewPassword;
