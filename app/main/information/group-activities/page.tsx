import React from "react";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

export default function GroupActivitiesPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6 pb-24">
      <Link 
        href="/main/information" 
        className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors font-medium"
      >
        <MdArrowBack className="mr-2 h-5 w-5" />
        Back to Information
      </Link>

      <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
        <div className="mb-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10">
              <FaUsers className="h-7 w-7 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">Group Activities</h1>
        </div>

        <div className="prose prose-lg mt-8 max-w-none text-gray-800">
          <p className="text-xl font-medium text-gray-900">
            Most collective contact sports and group activities have minimal additional risk, as long as appropriate safety measures are taken.
          </p>

          <h3 className="text-gray-900 text-2xl font-bold mt-8 mb-4">Safety Tips</h3>
          <ul className="list-decimal pl-6 space-y-4">
              <li>
                  Make sure to tell your friends, teammates, or coaches about your epilepsy and what to do in case of a seizure.
              </li>
              <li>
                  Consider wearing a medic alert bracelet or keeping a card handy that lets people know about your epilepsy and the steps for first aid.
              </li>
              <li>
                  Wear safety gear: elbow or knee pads, a helmet, and if needed, protective eyeglasses or goggles.
              </li>
              <li>
                  Stay hydrated by bringing a big bottle of water for each game or activity session. Dehydration can raise the chances of having a seizure.
              </li>
              <li>
                  Remember to take short breaks to prevent overheating and stress.
              </li>
              <li>
                  Consider the heat and how your seizures are affected by higher temperatures. It might be best to avoid intense group activities on especially warm days.
              </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
