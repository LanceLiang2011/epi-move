import React from "react";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { FaUser } from "react-icons/fa";

export default function SoloActivitiesPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6 pb-24">
      <Link 
        href="/information" 
        className="inline-flex items-center text-amber-600 hover:text-amber-700 transition-colors font-medium"
      >
        <MdArrowBack className="mr-2 h-5 w-5" />
        Back to Information
      </Link>

      <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
        <div className="mb-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10">
              <FaUser className="h-7 w-7 text-amber-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">Solo Activities</h1>
        </div>

        <div className="prose prose-lg mt-8 max-w-none text-gray-800">
          <p className="text-xl font-medium text-gray-900">
            Enjoying your favorite activities on your own is possible with thoughtful preparation and open communication.
          </p>

          <h3 className="text-gray-900 text-2xl font-bold mt-8 mb-4">Safety Tips</h3>
          <ul className="list-decimal pl-6 space-y-4">
              <li>
                  <strong>Inform Your Support System:</strong> Always tell someone (a friend, family member, or caregiver) where you are going, what activity you are doing, and when you expect to return. Consider sharing your location via your smartphone.
              </li>
              <li>
                  <strong>Bring Medication With You:</strong> Make sure you have your standard medications and any emergency/rescue medications in an easily accessible, secure place.
              </li>
              <li>
                  <strong>Wear Medical ID:</strong> Consider wearing a medic alert bracelet, necklace, or carrying an ID card that clearly states your condition and first-aid instructions.
              </li>
              <li>
                  <strong>Know Your Limits:</strong> Listen to your body and recognize early warning signs. Do not push yourself to extreme fatigue.
              </li>
              <li>
                  <strong>Stay Visible & Accessible:</strong> Prefer established trails, well-lit areas, and paths where help is relatively easy to reach if necessary. 
              </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
