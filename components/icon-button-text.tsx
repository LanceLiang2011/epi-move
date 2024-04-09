import Link from "next/link";
import React from "react";

interface Props {
  label: string;
  href: string;
  Icon: React.ReactNode;
}

export default function IconButtonText({ label, href, Icon }: Props) {
  return (
    <div className="flex flex-col gap-2 items-center">
      <Link href={href}>
        <div className="flex items-center justify-center h-10 w-10 p-2 rounded-full bg-primary">
          {Icon}
        </div>
      </Link>
      <p className=" text-xs">{label}</p>
    </div>
  );
}
