import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import React from "react";

const PendingModal = ({ handleCloseModal, person }: any) => {
  return (
    <div className="bg-white p-4 w-full mx-2 md:mx-0 md:w-1/3 h-5/6">
      <div>
        <div className="flex justify-between items-center">
          <h1 className="md:text-2xl text-lg font-medium">Terraform</h1>
          <span
            onClick={handleCloseModal}
            className="border-2 cursor-pointer border-main p-2 rounded-sm w-[32px] h-[32px] flex justify-center items-center"
          >
            <X className="text-main" />
          </span>
        </div>
        <div className="md:px-2.5 px-1 py-1 my-2 bg-[#FFF3E5] text-[#EE7E00] rounded-[16px] w-[110px] text-center">
          <p>Pending</p>
        </div>
      </div>
      <div>
        <div className="my-4">
          <h1 className="text-[#000066] text-base md:text-xl font-medium">
            Submission link
          </h1>
          <Input type="text" placeholder="Input link" />
        </div>
        <div className="my-4">
          <h1 className="text-[#000066] text-base md:text-xl font-medium">
            Files
          </h1>
          <div className="rounded-[8px] border-dotted border-2">
            <Input type="file" className=" " />
          </div>
        </div>

        <div className="my-4">
          <h1 className="text-[#000066] text-base md:text-xl font-medium">
            Add comment
          </h1>
          <Textarea className="bg-[#EEEEFB] text-[#F8F9FF] text-base md:text-lg" />
        </div>
      </div>
      <div className="flex justify-end">
        <Button className="bg-sub hover:text-white text-black">Submit</Button>
      </div>
    </div>
  );
};

export default PendingModal;
