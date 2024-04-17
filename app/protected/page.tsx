"use client";
import Logo from "@/components/Logo";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function returnPage(page: number, username?: string) {
  switch (page) {
    case 1: {
      return <PageOne username={username} />;
    }
    case 2: {
      return <PageTwo />;
    }

    default:
      return null;
  }
}

export default function Page() {
  const supabase = createClient();
  const [user, setUser] = useState<string | undefined>(undefined);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user?.email ?? undefined);
    }

    getUser();
  }, []);
  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="">
        <Logo />
      </div>
      <div className="flex flex-col flex-1 gap-2 bg-white rounded-xl w-full px-12 py-16">
        <p className=" text-primary text-2xl">Welcome to</p>
        <div className=" text-background font-bold text-4xl">EpiMove</div>
        <div className=" border-b-2 border-primary py-2 mb-6 w-2/5" />
        {returnPage(page, user)}
        <div className="flex pt-2 mt-auto justify-between text-background font-bold">
          <Link href={`/protected/main`}>Skip</Link>
          {page === 2 ? (
            <Link href={`/protected/main`}>Enter</Link>
          ) : (
            <button onClick={() => setPage((p) => p + 1)}>Next</button>
          )}
        </div>
      </div>
    </div>
  );
}

function PageOne({ username }: { username: string | null | undefined }) {
  return (
    <>
      <p className=" text-background">
        Hello {username || "Visitor"}, thank you for visiting EpiMove! We
        created this app to help you explore physical activities that may suit
        your interests.
      </p>
      <p className=" text-background">
        Physical activity is important for your health and well-being. Having
        epilepsy shouldn’t stop you from enjoying and being active.
      </p>
    </>
  );
}

function PageTwo() {
  return (
    <>
      <p className=" text-background font-bold">
        Physical activity can help you
      </p>
      <ul className=" text-background list-disc list-inside">
        <li>Improve seizure control</li>
        <li>Enhance your mood3 and quality of life</li>
        <li>Have better sleep</li>
        <li>Reduces stress</li>
      </ul>
      <p className=" text-background font-bold">What EpiMove offers</p>
      <ol className=" text-background list-decimal list-inside">
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
