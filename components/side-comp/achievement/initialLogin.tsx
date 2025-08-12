import { XCircleIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import pistis_logo from "@/src/assets/pistis_logo.png";
import { useRouter } from "next-nprogress-bar";

const InitialLogin = ({ setOpen }: { setOpen: (val: boolean) => void }) => {
  const router = useRouter();
  return (
    <div
      style={{ boxShadow: "0px 0px 45px 0px #0000004D" }}
      className="bg-white p-4 w-1/2 rounded-[20px] relative"
    >
      <span
        className="flex items-center gap-2 text-sm absolute top-4 right-4 text-[#999999] cursor-pointer"
        onClick={() => setOpen(false)}
      >
        <p>Upgrade plan later</p>
        <XCircleIcon className="w-[22px] h-[22px]" />
      </span>
      <div className="flex flex-col items-center gap-3">
        <Image
          src={pistis_logo}
          alt="logo"
          priority
          //   className="w-[122px] h-[130px] "
        />

        <h1 className="text-main font-bold text-[32px] ">Welcome Onboard 🎉</h1>
        <p className="text-[#828282] font-sfProDisplay text-center py-3">
          You're on the Free Plan, with access to basic DevOps content and
          community support. Upgrade to the Intermediate Plan for advanced
          courses, real-world projects, and mentorship, or join a cohort for a
          structured, collaborative learning experience with certification.
        </p>
        <button
          onClick={() => router.push("/custom-pricing")}
          className="bg-main text-white font-sfProDisplay cursor-pointer font-medium p-4 rounded-[8px]"
        >
          Level up your DevOps journey today!
        </button>
      </div>
    </div>
  );
};

export default InitialLogin;
