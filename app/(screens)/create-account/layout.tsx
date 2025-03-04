import type { Metadata } from "next";
import Image from "next/image";
import kelsey from "@/src/assets/kelsey.png"
import bg from "@/src/assets/forgot-bg.png";

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
      <main className=" bg-white h-screen w-full relative gap-2 flex">
      <div className="hidden md:block p-2 w-1/2 h-screen relative">
        <div className="relative mx-auto w-fit h-full ">
          <Image src={bg} alt="auth image" className=" object-fill  h-full" />
          <div className="w-[80%] p-3 bg-white/5 border-2 rounded-[20px] border-white absolute bottom-5 left-2 ">
            <p className="font-normal text-white text-sm">
              You don’t need to be an expert to start with DevOps. The key is a
              willingness to learn, collaborate, and embrace automation. Every
              small step you take towards improving your processes brings you
              closer to success.
            </p>
            <div className="flex items-center gap-2 my-2">
              <Image src={kelsey} alt="gene" />
              <p className="text-2xl font-semibold text-white">
                Kelsey Hightower
              </p>
            </div>
          </div>
        </div>
      </div>
        <div className="flex justify-center w-full md:w-1/2 h-screen overflow-y-scroll px-2">
          {children}
        </div>
      </main>
    </div>
  );
}
