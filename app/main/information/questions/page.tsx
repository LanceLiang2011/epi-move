import React from "react";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";

export default function QuestionsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6 pb-24">
      <Link 
        href="/main/information" 
        className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
      >
        <MdArrowBack className="mr-2 h-5 w-5" />
        Back to Information
      </Link>

      <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
        <div className="mb-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <FaQuestionCircle className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">Questions to Ask Oneself</h1>
        </div>

        <div className="prose prose-lg mt-8 max-w-none text-gray-800">
          <p className="text-xl font-medium text-gray-900">
            Assess your risks or evaluate them with your doctor. Consider these questions before participating in sports or other physical activities.
          </p>

          <ul className="list-disc pl-6 space-y-3 mt-6">
              <li>What are your seizures like?</li>
              <li>Do you have seizures where you become unconscious, confused or are only partly aware of what is happening?</li>
              <li>When was your last seizure?</li>
              <li>Are your seizures controlled (stopped) with medication?</li>
              <li>When do your seizures occur?</li>
              <li>Are your seizures triggered by stress or tiredness?</li>
              <li>Are there any signs or symptoms that warn you that a seizure is going to happen?</li>
              <li>Would you be able to alert others and be able to get to a safe or safer place?</li>
              <li>What would make the activity safer for you?</li>
              <li className="text-primary font-medium">Have you brought your emergency medication and/or standard medication with you?</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
