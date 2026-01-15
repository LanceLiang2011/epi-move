import React from "react";
import Image from "next/image";
import DowloadButton from "../dowload-button";

export default function Page() {
  return (
    <div className=" w-full">
      <div className=" sticky top-0 z-0 w-full">
        <Image
          className=" object-fit w-full"
          height={1280}
          width={1920}
          alt={`preparing for seizures`}
          src={`/images/preparing-for-seizures.jpeg`}
        />
      </div>
      <div className=" relative -top-6 z-10 rounded-3xl bg-white px-6 pt-8">
        <h1 className=" py-6 text-3xl capitalize  text-background">
          Nearby activity centres
        </h1>
        <div className="article prose text-teal-950 lg:prose-xl">
          <p>
            Jooay is a fantastic free app just for you and your family. With
            Jooay, you can easily find leisure activities that are close by,
            accessible, and perfectly suited to your needs and abilities.
            Whether it's sports, arts, or other activities, Jooay helps you
            discover options that match your preferences and support your
            development.
          </p>
          <p>
            Plus, it's not just an app – it's a whole community where you can
            connect with parents, professionals, and others like you. You'll
            learn, share, and grow together.
          </p>
          <p>
            Developed by occupational therapists and childhood disability
            researchers Dr. Keiko Shikako-Thomas and Dr. Annette Majnemer, along
            with input from parents, policymakers, and community partners, Jooay
            is here to make physical activities a lot more fun for you.
          </p>
        </div>
        <div className="my-8 flex items-center justify-center">
          <DowloadButton link={"https://jooay.com"} />
        </div>
      </div>
    </div>
  );
}
