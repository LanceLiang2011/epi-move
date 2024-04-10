import Logo from "@/components/Logo";
import Username from "@/components/auth/username";
import Link from "next/link";
import React, { Suspense } from "react";

export default async function Page() {
  return (
    <div className="flex flex-col items-center w-full">
      <div className=" py-12">
        <Logo />
      </div>
      <div className="flex flex-col gap-2 bg-white rounded-xl w-full px-12 py-16">
        <p className=" text-primary text-2xl">Welcome to</p>
        <div className=" text-background font-bold text-4xl">EpiMove</div>
        <div className=" border-b-2 border-primary py-2 mb-6 w-2/5" />
        <p className=" text-background">
          Hello{" "}
          {
            <Suspense fallback={<span>Visitor</span>}>
              <Username />
            </Suspense>
          }
          , thank you for visiting EpiMove! We created the app to help you
          explore physical activities that my be right for you
        </p>
        <p className=" text-background">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit, non
          iure sapiente vero aliquam doloremque iste totam autem, commodi,
          officiis laboriosam.
        </p>
        <div className="flex pt-2 justify-between text-background font-bold">
          <Link href={`/protected/main`}>Skip</Link>
          <Link href={`/protected/main`}>Next</Link>
        </div>
      </div>
    </div>
  );
}
