import React from "react";
import Image from "next/image";

export default function Logo() {
  return (
    <div className=" w-fit self-center">
      <Image
        className="w-full"
        src={`/images/logo.png`}
        alt="Logo Place Holder"
        height={512}
        width={512}
      />
    </div>
  );
}
