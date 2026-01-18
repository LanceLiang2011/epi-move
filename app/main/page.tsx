"use client";
import Logo from "@/components/Logo";
import Link from "next/link";
import React, { useState } from "react";

function returnPage(page: number) {
  switch (page) {
    case 1: {
      return <PageOne />;
    }
    case 2: {
      return <PageTwo />;
    }

    default:
      return null;
  }
}

export default function Page() {
  const [page, setPage] = useState<number>(1);

  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="">
        <Logo />
      </div>
      <div className="flex w-full flex-1 flex-col gap-2 rounded-xl bg-white px-12 py-16">
        <p className=" text-2xl text-primary">Welcome to</p>
        <div className=" text-4xl font-bold text-background">EpiMove</div>
        <div className=" mb-6 w-2/5 border-b-2 border-primary py-2" />
        {returnPage(page)}
        <div className="mt-auto flex justify-between pt-2 font-bold text-background">
          <Link href={`/main/activities`}>Skip</Link>
          {page === 2 ? (
            <Link href={`/main/activities`}>Enter</Link>
          ) : (
            <button onClick={() => setPage((p) => p + 1)}>Next</button>
          )}
        </div>
      </div>
    </div>
  );
}

function PageOne() {
  return (
    <>
      <p className=" text-background">
        Hello, thank you for visiting EpiMove! We created this app to help you
        explore physical activities that may suit your interests.
      </p>
      <p className=" text-background">
        Physical activity is important for your health and well-being. Having
        epilepsy shouldn't stop you from enjoying and being active.
      </p>
    </>
  );
}

function PageTwo() {
  return (
    <>
      <p className=" font-bold text-background">
        Physical activity can help you
      </p>
      <ul className=" list-inside list-disc text-background">
        <li>
          Improve seizure control<span className="citation">1,2</span>
        </li>
        <li>
          Enhance your mood<span className="citation">3</span> and quality of
          life<span className="citation">4</span>
        </li>
        <li>Have better sleep</li>
        <li>
          Reduces stress<span className="citation">5</span>
        </li>
      </ul>
      <p className=" font-bold text-background">What EpiMove offers</p>
      <ol className=" list-inside list-decimal text-background">
        <li>
          Activities: explore a variety of physical activities you can do alone,
          with peers or with family.
        </li>
        <li>
          Resources: access information and tips on how to set goals, find
          nearby sports centres, join online groups and discover success
          stories.
        </li>
        <li>
          Profile: create a personalized homepage with your favourite
          activities, recreation centres and notes from your clinic visits.
        </li>
      </ol>
    </>
  );
}
