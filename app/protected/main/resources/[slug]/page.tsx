import React from "react";

export default function Page({ params }: { params: { slug: string } }) {
  return <div className=" text-4xl text-background">{params.slug}</div>;
}
