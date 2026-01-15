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
          alt={`success stories`}
          src={`/images/success-stories.jpeg`}
        />
      </div>
      <div className=" relative -top-6 z-10 rounded-3xl bg-white px-6 pt-8">
        <h1 className=" py-6 text-3xl capitalize  text-background">
          Success stories
        </h1>
        <div className="article prose text-teal-950 lg:prose-xl">
          <ul>
            <li>
              <a href="https://www.epsyhealth.com/seizure-epilepsy-blog/7-olympic-athletes-with-epilepsy">
                7 Olympic athletes with epilepsy. Epsy
              </a>
            </li>
            <li>
              <a href="https://www.epilepsy.com/stories/athletes-vs-epilepsy-spokesperson-zach-mcginnis-swims-us-nationals">
                Athletes vs. Epilepsy Spokesperson Zach McGinnis Swims in U.S.
                Nationals. Epilepsy Foundation
              </a>
            </li>{" "}
            <li>
              <a href="https://www.huffpost.com/archive/ca/entry/what-its-like-to-be-a-triathlete-with-epilepsy_b_6877150">
                What it's Like to Be a Triathlete With Epilepsy. Huffpost
              </a>
            </li>
          </ul>
        </div>
        <div className="my-8 flex flex-col  justify-center gap-8">
          <h2 className=" text-2xl text-background">Related Videos</h2>
          <div>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/OScBxa6FpCk?si=o5OCB1WWIbzDV1uH"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          <div>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/xlc2HUbBBwA?si=ZRdKn9gPDaYWo9MO"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
