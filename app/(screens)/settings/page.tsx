// "use client";
// import React, { useState , useEffect} from "react";

// import SideNav from "@/components/side-comp/side-nav";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import Image from "next/image";
// import Cookies from 'js-cookie'

// import user from "@/public/assets/avatar.png";
// import { EditIcon, Eye, EyeOff, KeyRound, Loader2, Mail } from "lucide-react";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// import axios from "axios";
// import { urls } from "@/utils/config";
// import TopNav from "@/components/side-comp/topNav";
// import refreshToken from "@/utils/refreshToken";
// import { cookies } from "next/headers";

// //general schema
// const formSchema = z.object({
//   email: z.string().min(2, {
//     message: "Input correct email address",
//   }),
//   fullName: z.string(),
//   phoneNumber: z.number()
// });
// //password change schema
// const formSchema2 = z.object({
//   currentPassword: z.string(),
//   newPassword: z.string(),
//   confirmPassword: z.string(),
// });
// interface UserDetailsInterface {
// full_name:string;
// phoneNumber:number;
// email:string;
// }

// const SettingsPage = () => {
//   //general default values
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//       fullName: "",
//       phoneNumber: 0
//     },
//   });

//   // password change default value
//   const form2 = useForm<z.infer<typeof formSchema2>>({
//     resolver: zodResolver(formSchema2),
//     defaultValues: {
//       currentPassword: "",
//       newPassword: "",
//       confirmPassword: "",
//     },
//   });
//   const [notSame, setNotSame] = useState("");
//   const [deleteModal, setDeleteModal] = useState(false);
//   const showDeleteModal = () => {
//     setDeleteModal((prev) => !prev);
//   };

//   // function submitPassword(values: z.infer<typeof formSchema2>, e:any) {
//   //   e.preventDefault();
//   //   // if (values.confirmPassword === values.newPassword) {
//   //   console.log(values.confirmPassword, "cP");
//   //   console.log(values.newPassword, "newp");
//   //   console.log(values.currentPassword, "cuxP");
//   //   const token = Cookies.get("authToken");
//   //   axios
//   //     .post(
//   //       urls.setStudentPassword,
//   //       {
//   //         new_passsword: values.newPassword,
//   //         re_new_password: values.confirmPassword,
//   //         current_password: values.currentPassword,
//   //       },
//   //       {
//   //         headers: {
//   //           Authorization: "Bearer " + token,
//   //         },
//   //       }
//   //     )
//   //     .then((res) => {
//   //       //you may decide to remove token, if necessary
//   //       console.log(res.status);
//   //       // Cookies.remove("authToken");
//   //       // router.replace("/");
//   //     })
//   //     .catch((error) => console.log(error));
//   //   // } else {
//   //   //   setNotSame("New Password and Confirm Password must be the same");
//   //   // }
//   // }

//   //function works, rewrite in a way you understand. also check if new password and confirm newpassword is same before running the post operation.
//   //write a similar function to change general details (patch) using the fields in "submitGeneral" function
//   const submitPassword = async (
//     values: z.infer<typeof formSchema2>,
//     e: any
//   ) => {
//     e.preventDefault();

//     try {
//       const token = Cookies.get("authToken"); // Use token instead of accessToken
//       const response = await axios.post(
//         urls.setStudentPassword,
//         {
//           new_password: values.newPassword,
//           re_new_password: values.confirmPassword,
//           current_password: values.currentPassword,
//         },
//         {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         }
//       );
//       ///204 is the success status
//       if (response.status === 204) {
//         console.log("done?");
//         //handle what happends after success. either remove cookie or not, your choice.
//       }
//       // Handle the response as needed
//     } catch (error: any) {
//       //this checks for the 401 error, which is "unauthorised" i.e token expired
//       if (error.response && error.response.status === 401) {
//         try {
//           //this refreshToken is a function that helps to refresh an expired access token; you can get it from utils
//           await refreshToken();
//           // this helps to re do function after the access token has been refreshed
//           await submitPassword(values, e);

//           // Handle the response after refreshing the token
//         } catch (refreshError: any) {
//           console.error("Error refreshing token:", refreshError.message);
//           // Handle refresh error
//         }
//       } else {
//         console.error("Password change failed:", error.message);
//         // Handle other errors
//       }
//     }
//   };

//   const submitGeneral = async (values: z.infer<typeof formSchema>, e: any) => {
//     e.preventDefault();
//     // console.log(values.email);
//     // console.log(values.fullName);
//     // console.log(values.phoneNumber);
//   };

//   const [showPassword, setShowPassword] = useState(true);
//   const togglePassword = () => {
//     setShowPassword((prev) => !prev);
//   };
//   const [showNewPassword, setShowNewPassword] = useState(true);
//   const toggleNewPassword = () => {
//     setShowNewPassword((prev) => !prev);
//   };
//   const [showConfirmPassword, setShowConfirmPassword] = useState(true);
//   const toggleConfirmPassword = () => {
//     setShowConfirmPassword((prev) => !prev);
//   };

//   const [loading, setLoading] = useState(false);
//   const DeleteStudent = async () => {
//     setLoading(true);
//     try {
//       const accessToken = Cookies.get("authToken");
//       const response = await axios.delete(urls.deleteStudent, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       Cookies.remove("authToken");
//     } catch (error: any) {
//       if (error.response && error.response.status === 401) {
//         try {
//           const refreshToken = Cookies.get("refreshToken");
//           const accessToken = Cookies.get("authToken");

//           const refreshResponse = await axios.post(urls.adminRefreshToken, {
//             refresh: refreshToken,
//             access: accessToken,
//           });
//           Cookies.set("authToken", refreshResponse.data.access);
//           // Retry the fetch after token refresh
//           await DeleteStudent();
//         } catch (refreshError: any) {
//           console.error("Error refreshing token:", refreshError.message);
//           Cookies.remove("authToken");
//         }
//       } else {
//         console.error("Error:", error.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

"use client";
import React, { useState } from "react";

import SideNav from "@/components/side-comp/side-nav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";

import user from "@/public/assets/avatar.png";
import { EditIcon, Eye, EyeOff, KeyRound, Loader2, Mail } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TopNav from "@/components/side-comp/topNav";
import axios from "axios";
import { urls } from "@/utils/config";
import refreshToken from "@/utils/refreshToken";
import Cookies from "js-cookie";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formSchema = z.object({
  Email: z.string().min(2, {
    message: "Input correct email address",
  }),
  fullName: z.string(),
  phone_number: z.string(),
});
const passwordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z
    .string()
    .min(8, "Password should have at least 8  characters")
    .refine(
      (value) =>
        /^(?=.*[!@#$%^&*()_+{}|:<>?~_-])[a-zA-Z\d!@#$%^&*()_+{}|:<>?~_-]+$/.test(
          value
        ),
      "Password should contain at least one special character"
    ),
  confirmPassword: z
    .string()
    .min(8, "Password should have at least 6 characters")
    .refine(
      (value) =>
        /^(?=.*[!@#$%^&*()_+{}|:<>?~_-])[a-zA-Z\d!@#$%^&*()_+{}|:<>?~_-]+$/.test(
          value
        ),
      "Password should contain at least one special character"
    ),
});

const SettingsPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Email: "",
      fullName: "",
      phone_number: "",
    },
  });
  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [notSame, setNotSame] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const showDeleteModal = () => {
    setDeleteModal((prev) => !prev);
  };

  //add loading state for both
  //add no network state for both
  //add success toast
  //add error toast
  const [passwordLoading, setPasswordLoading] = useState(false);
  const onSubmit = async (values: z.infer<typeof passwordSchema>, e: any) => {
    e.preventDefault();
    if (values.confirmPassword === values.newPassword) {
      setNotSame("");
      try {
        setPasswordLoading(true);
        const token = Cookies.get("adminAccessToken");
        const response = await axios.post(
          urls.setStudentPassword,
          {
            new_password: values.newPassword,
            re_new_password: values.confirmPassword,
            current_password: values.currentPassword,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log(response, "pass");

        if (response.status === 204) {
          setPasswordLoading(false);
          toast.success("Password changed successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });
        }
      } catch (error: any) {
        console.log(error);
        if (error.response && error.response.status === 401) {
          try {
            await refreshToken();
            await onSubmit(values, e);
          } catch (refreshError: any) {
            console.error("Error refreshing token:", refreshError.message);
          }
        } else if (error?.message === "Network Error") {
          toast.error("Check your network!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });
        } else if (
          error.response.data.new_password[0] ===
            "The password is too similar to the First Name." ||
          error.response.data.new_password[0] ===
            "The password is too similar to the Last Name."
        ) {
          toast.error("Password is too similar to name", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });
        } else if (
          error.response.data.current_password[0] === "Invalid password."
        ) {
          toast.error("Invalid current password!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });
        } else {
          console.log("Password change failed:", error);
        }
      } finally {
        setPasswordLoading(false);
      }
    } else {
      setNotSame("New password and confirm new Password must be the same");
    }
  };
  const [generalLoading, setGeneralLoading] = useState(false);
  const onSubmitGeneral = async (
    values: z.infer<typeof formSchema>,
    e: any
  ) => {
    e.preventDefault();

    try {
      setGeneralLoading(true);
      const token = Cookies.get("authToken");
      const response = await axios.patch(
        urls.updateStudentProfile,
        {
          full_name: values.fullName,
          email: values.Email,
          phoneNumber: values.phone_number,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        setGeneralLoading(false);
        toast.success("General details changed successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        try {
          await refreshToken();
          await onSubmitGeneral(values, e);
        } catch (refreshError: any) {
          console.error("Error refreshing token:", refreshError.message);
          Cookies.remove("adminAccessToken");
        }
      } else if (error?.message === "Network Error") {
        toast.error("Check your network!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      } else {
        console.log("Password change failed:", error);
      }
    } finally {
      setGeneralLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(true);
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const [showNewPassword, setShowNewPassword] = useState(true);
  const toggleNewPassword = () => {
    setShowNewPassword((prev) => !prev);
  };
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const toggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <main className="relative h-screen bg-[#FBFBFB]">
      <SideNav />
      <div className="md:ml-64 ml-0 overflow-y-scroll h-screen">
        <div className="md:h-[96px] h-[60px] flex justify-end items-center bg-white shadow-md p-4 w-full">
          <TopNav />
        </div>
        <div className="md:p-5 p-2">
          <div>
            <div className=" flex justify-center items-center">
              <div className="relative">
                <Image
                  className="w-[159px] h-[159px] rounded-full"
                  src={user}
                  alt="user"
                  priority
                />
                <span className="bg-white rounded-full cursor-pointer absolute bottom-0 right-0 p-2">
                  <EditIcon />
                </span>
              </div>
            </div>
            <div>
              <div className="md:px-5 px-2">
                {/* general form fields */}
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmitGeneral)}
                    className="space-y-3"
                  >
                    <div className="block md:grid grid-cols-6 py-5">
                      <h1 className="text-lg md:text-[22px] col-span-2 font-medium ">
                        General
                      </h1>
                      <div className="col-span-4">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="md:text-xl text-sm my-3 text-[#3E3E3E]">
                                Full name
                              </FormLabel>
                              <FormControl>
                                <div className="">
                                  <Input
                                    className="py-6 bg-[#FAFAFA] placeholder:text-[#4F5B67] w-full rounded-[6px]"
                                    placeholder="John Mark"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="Email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="md:text-xl text-sm my-3 text-[#3E3E3E]">
                                Email Address
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Mail className="mr-2 absolute top-4 text-[#4F5B67] left-3 h-5 w-5" />
                                  <Input
                                    type="email"
                                    className="py-6 bg-[#FAFAFA] placeholder:text-[#4F5B67] rounded-[6px] indent-6"
                                    placeholder="example@gmail.com"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone_number"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="md:text-xl text-sm my-3 text-[#3E3E3E]">
                                Phone Number
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Mail className="mr-2 absolute top-4 text-[#4F5B67] left-3 h-5 w-5" />
                                  <Input
                                    type="phoneNumber"
                                    className="py-6 bg-[#FAFAFA] placeholder:text-[#4F5B67] rounded-[6px] indent-6"
                                    placeholder="445-892-5312"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="lg:flex block justify-end">
                      <Button
                        disabled={generalLoading}
                        type="submit"
                        className="w-full lg:w-1/3 bg-[#33CC99] disabled:bg-[#33CC99]/25 disabled:cursor-none py-6 font-medium text-lg md:text-2xl text-black hover:text-white"
                      >
                        {generalLoading ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
                {/* change password form field */}
                <Form {...passwordForm}>
                  <form
                    onSubmit={passwordForm.handleSubmit(onSubmit)}
                    className="space-y-3"
                  >
                    <div className="block md:grid grid-cols-6 py-5">
                      <h1 className="text-[22px] col-span-2 font-medium ">
                        Password
                      </h1>
                      <div className="col-span-4">
                        <FormField
                          control={passwordForm.control}
                          name="currentPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="md:text-xl text-sm my-3 text-[#3E3E3E]">
                                Current password
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <KeyRound className="mr-2 absolute top-4 text-[#4F5B67] left-3 h-5 w-5" />
                                  {showPassword ? (
                                    <Eye
                                      onClick={togglePassword}
                                      className="ml-2 absolute cursor-pointer top-4 text-[#4F5B67] right-3 h-5 w-5"
                                    />
                                  ) : (
                                    <EyeOff
                                      onClick={togglePassword}
                                      className="ml-2 absolute cursor-pointer top-4 text-[#4F5B67] right-3 h-5 w-5"
                                    />
                                  )}
                                  <Input
                                    type={showPassword ? "password" : "text"}
                                    className="py-6 bg-[#FAFAFA] placeholder:text-[#4F5B67] rounded-[6px] indent-6"
                                    placeholder="Password"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={passwordForm.control}
                          name="newPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="md:text-xl text-sm my-3 text-[#3E3E3E]">
                                New password
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <KeyRound className="mr-2 absolute top-4 text-[#4F5B67] left-3 h-5 w-5" />
                                  {showNewPassword ? (
                                    <Eye
                                      onClick={toggleNewPassword}
                                      className="ml-2 absolute cursor-pointer top-4 text-[#4F5B67] right-3 h-5 w-5"
                                    />
                                  ) : (
                                    <EyeOff
                                      onClick={toggleNewPassword}
                                      className="ml-2 absolute cursor-pointer top-4 text-[#4F5B67] right-3 h-5 w-5"
                                    />
                                  )}
                                  <Input
                                    type={showNewPassword ? "password" : "text"}
                                    className="py-6 bg-[#FAFAFA] placeholder:text-[#4F5B67] rounded-[6px] indent-6"
                                    placeholder="Password"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={passwordForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="md:text-xl text-sm my-3 text-[#3E3E3E]">
                                Confirm password
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <KeyRound className="mr-2 absolute top-4 text-[#4F5B67] left-3 h-5 w-5" />
                                  {showConfirmPassword ? (
                                    <Eye
                                      onClick={toggleConfirmPassword}
                                      className="ml-2 absolute cursor-pointer top-4 text-[#4F5B67] right-3 h-5 w-5"
                                    />
                                  ) : (
                                    <EyeOff
                                      onClick={toggleConfirmPassword}
                                      className="ml-2 absolute cursor-pointer top-4 text-[#4F5B67] right-3 h-5 w-5"
                                    />
                                  )}
                                  <Input
                                    type={
                                      showConfirmPassword ? "password" : "text"
                                    }
                                    className="py-6 bg-[#FAFAFA] placeholder:text-[#4F5B67] rounded-[6px] indent-6"
                                    placeholder="Password"
                                    {...field}
                                  />
                                  <p className="text-xl text-red-500 text-center">
                                    {notSame}
                                  </p>
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="lg:flex block justify-end">
                      <Button
                        disabled={passwordLoading}
                        type="submit"
                        className="w-full lg:w-1/3 bg-[#33CC99] py-6 font-medium text-lg md:text-2xl text-black hover:text-white"
                      >
                        {passwordLoading ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
              <div className="lg:flex block justify-between items-center p-2 md:p-5">
                <h2 className="md:text-[22px] text-lg font-medium ">
                  Delete Account
                </h2>
                <p className="md:text-xl text-sm font-normal w-full lg:w-96">
                  All data associated with this account will be deleted if you
                  deactivate this account
                </p>
                <h2
                  onClick={showDeleteModal}
                  className="text-red-500 cursor-pointer text-base text-center lg:text-left my-4 lg:my-0 md:text-xl font-medium "
                >
                  Deactivate
                </h2>
              </div>
              {deleteModal && (
                <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center bg-slate-200/50">
                  <div className="bg-white rounded-[8px] py-10 px-5 w-auto max-w-[605px] h-[189px] max-h-auto">
                    <h1 className="text-black font-semibold text-2xl ">
                      Deactivate account
                    </h1>
                    <p className="text-[#3E3E3E] text-lg py-2">
                      Are you sure you want to deactivate your account? By doing
                      this, you will lose all your saved data
                    </p>
                    <div className="flex justify-end gap-x-5 items-center">
                      <Button
                        // onClick={DeleteStudent}
                        disabled={passwordLoading}
                        className="bg-[#F10F2A] text-white"
                      >
                        {passwordLoading ? (
                          <Loader2 className=" animate-spin" />
                        ) : (
                          <p>Deactivate</p>
                        )}
                      </Button>
                      <p className="cursor-pointer" onClick={showDeleteModal}>
                        Cancel
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SettingsPage;
