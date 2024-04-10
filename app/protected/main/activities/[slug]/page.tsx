import Image from "next/image";
import React from "react";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div className=" w-full">
      <Image
        height={300}
        width={600}
        alt={params.slug}
        src={`/images/${params.slug}.jpeg`}
      />
      <h1 className=" capitalize text-3xl text-background text-center">
        {params.slug}
      </h1>
    </div>
  );
}
