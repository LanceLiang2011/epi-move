"use client";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  title: string;
  Icon: React.ReactNode;
  placeholder?: string;
  searchHref?: string;
}

export default function Heading({ title, Icon, placeholder = "", searchHref = "/main/activities" }: Props) {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    router.push(`${searchHref}?keyword=${encodeURIComponent(inputValue.trim())}`);
  };

  return (
    <div className="w-full bg-background">
      <div className="relative p-4">
        <Input
          aria-label={placeholder || "Search activities"}
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
          className="pointer-events-none absolute bottom-6 right-6"
          color="#32102d"
          size={24}
        />
      </div>
      <div className="h-42 flex w-full items-center justify-center bg-background py-6">
        <div className="ml-4 flex h-20 w-20 shrink-0 sm:ml-8 sm:h-24 sm:w-24 items-center justify-center rounded-xl bg-primary">
          {Icon}
        </div>
        <div className="flex flex-1 items-center justify-center">
          <h2 className="px-4 text-xl uppercase sm:px-8 sm:text-2xl">{title}</h2>
        </div>
      </div>
    </div>
  );
}
