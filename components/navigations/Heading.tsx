"use client";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  title: string;
  Icon: React.ReactNode;
  placeholder?: string;
}

export default function Heading({ title, Icon, placeholder = "" }: Props) {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    router.push(`/protected/main/activities?keyword=${inputValue}`);
  };

  return (
    <div className="w-full bg-background">
      <div className="relative p-4">
        <Input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <CiSearch
          className=" absolute bottom-6 right-6"
          color="white"
          size={24}
        />
      </div>
      <div className="h-42 flex w-full items-center justify-center bg-background py-6">
        <div className="ml-8 flex h-24 w-24 items-center justify-center rounded-xl bg-primary">
          {Icon}
        </div>
        <div className="flex flex-1 items-center justify-center">
          <h2 className="px-16 text-2xl uppercase">{title}</h2>
        </div>
      </div>
    </div>
  );
}
