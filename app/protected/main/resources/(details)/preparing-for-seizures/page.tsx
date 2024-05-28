import React from "react";
import Image from "next/image";
import DowloadButton from "./dowload-button";

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
          Preparing for seizures
        </h1>
        <div className="article prose text-teal-950 lg:prose-xl">
          <h3>
            Epilepsy Foundation Seizure Action Plan
            <span className="citation">38</span>
          </h3>
          <p>
            You and your family play a crucial role in managing your seizures.
            Your success in managing epilepsy depends on being prepared. Having
            a seizure action plan can help organize your information and provide
            guidance on preventing emergencies, so you can participate in and
            enjoy your life to the fullest without fear of seizures.
          </p>
          <p>
            The Epilepsy Foundation created forms to help you get started with
            developing a seizure action plan.
          </p>
        </div>
        <div className="my-8 flex items-center justify-center">
          <DowloadButton />
        </div>
        <div className="article prose text-teal-950 lg:prose-xl">
          <p>
            Review your completed plan with your doctor or nurse. Confirm that
            the information on seizure types, emergencies, medication doses, and
            responses to seizures and emergencies is correct.
          </p>
          <p>After everyone has approved the plan, make copies.</p>
          <p>
            Keep a copy with you at all times, whether in your purse, pocket,
            wallet, or backpack.
          </p>
          <p>
            Place a copy in a central location at home, and give copies to those
            who are frequently with you, if you feel comfortable doing so.
          </p>
          <p>
            Regularly review the plan with your healthcare team and family at
            least once a year or if your treatments or seizures changes.
          </p>
        </div>
      </div>
    </div>
  );
}
