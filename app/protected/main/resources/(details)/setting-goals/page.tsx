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
          alt={`Setting Goals`}
          src={`/images/setting-goals.jpeg`}
        />
      </div>
      <div className=" relative -top-6 z-10 rounded-3xl bg-white px-6 pt-8">
        <h1 className=" py-6 text-3xl capitalize  text-background">
          Setting Goals
        </h1>
        <div className="article prose text-teal-950 lg:prose-xl">
          <p>
            If you have been seizure-free for at least 12 months or if you have
            resolved epilepsy, you may participate in any type of exercise or
            physical activity. Resolved epilepsy means not having seizures for
            at least 10 years and not using anti-seizure medication for at least
            five years<span className="citation">39</span>.
          </p>
          <p>Steps to set physical activity goals:</p>
          <ol>
            <li>
              Talk to your doctor or healthcare team about physical activity
              levels that are right for you.<span className="citation">40</span>
            </li>
            <li>
              Discuss physical activity options with your doctor or healthcare
              team. Identify the accommodations you will need.
            </li>
            <li>
              The key is to start small and set measurable, attainable goals.
              <span className="citation">41</span>
              <ul>
                <li>
                  If the recommended 30+ minutes of physical activity most days
                  of the week feels overwhelming, start with just 5 minutes a
                  day.
                </li>
                <li>Try something simple, like a walk around your block.</li>
              </ul>
            </li>
            <li>
              Begin with minimal intensity in exercises you enjoy, but be sure
              to challenge yourself.
              <ul>
                <li>
                  Try walking three times a week, perhaps with a friend, family
                  member, or dog.
                </li>
                <li>
                  Gradually increase your distance or intensity with each outing
                  for greater rewards.<span className="citation">42</span>
                </li>
              </ul>
            </li>
          </ol>
          <p>
            Sail for Epilepsy shared a sheet you can use to set your goals with
            your healthcare team.<span className="citation">43</span>
          </p>
        </div>
        <div className="my-8 flex items-center justify-center">
          <DowloadButton
            link={
              "https://www.sailforepilepsy.org/sail/wp-content/uploads/2020/09/set-goals.pdf"
            }
          />
        </div>
      </div>
    </div>
  );
}
