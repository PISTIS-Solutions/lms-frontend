import type { Metadata } from "next";
import Image from "next/image";
import bg from "@/public/assets/auth_bg.webp";

export const metadata: Metadata = {
  title: "Create account",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main className=" bg-white min-h-screen w-full relative flex">
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
                Outline share italic underline clip. Frame invite export
                vertical select device. Underline ellipse outline figma
                follower. Undo selection select arrow share prototype component
                list. Arrow undo scale prototype boolean.Outline share italic
                underline clip. Frame invite export vertical select device.{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center  lg:w-[48.06%]  lg:overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
