import { Loader2 } from "lucide-react";
import Image from "next/image";

interface CourseOverviewCardProps {
  bgImage: any;
  icon: any;
  title: string;
  loading: boolean;
  value: number;
  isBgBlue?: boolean;
}

const CourseOverviewCard = ({
  bgImage,
  icon,
  title,
  loading,
  value,
  isBgBlue = false,
}: CourseOverviewCardProps) => {
  return (
    <div
      className={
        "shadow-[0_0_20px_0_rgba(0,0,0,0.10)] bg-white rounded-[10px] border-2 flex items-start p-6 flex-col gap-4 flex-[1_0_0] self-stretch w-[95%] md:w-full relative overflow-hidden " +
        (isBgBlue ? "border-[#02A1FF]" : "border-[#2FBC8D]")
      }
    >
      <div
        className={
          "p-2 w-fit rounded-[8px] " +
          (isBgBlue ? "bg-[#02A1FF]" : "bg-[#2FBC8D]")
        }
      >
        <Image src={icon} alt="icon" />
      </div>
      <div>
        {loading ? (
          <Loader2 className="animate-spin text-xl" />
        ) : (
          <h1 className="text-[56px] text-[#5D5B5B] font-medium !leading-[120%]">
            {value}
          </h1>
        )}
        <p className="lg:text-lg !leading-[120%] text-xs md:text-sm text-[#484848] font-medium text-wrap w-min">
          {title}
        </p>
      </div>
      <div className="absolute top-0 right-0 md:right-[-20%]   2xl:right-0">
        <Image src={bgImage} alt="background image" className=" h-72" />
      </div>
    </div>
  );
};

export default CourseOverviewCard;
