import React from "react";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";

interface Props {
  title: string;
  Icon: React.ReactNode;
  placeholder?: string;
}

export default function Heading({ title, Icon, placeholder = "" }: Props) {
  return (
    <div className="w-full bg-background">
      <div className="p-4 relative">
        <Input type="text" placeholder={placeholder} />
        <CiSearch
          className=" absolute right-6 bottom-6"
          color="black"
          size={24}
        />
      </div>
      <div className="flex w-full py-6 items-center justify-center bg-background h-42">
        <div className="flex items-center justify-center w-24 h-24 ml-8 bg-primary rounded-xl">
          {Icon}
        </div>
        <div className="flex items-center justify-center flex-1">
          <h2 className="uppercase text-2xl px-16">{title}</h2>
        </div>
      </div>
    </div>
  );
}
