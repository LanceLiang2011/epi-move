import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FaQuestionCircle, FaUsers, FaUser } from "react-icons/fa";

export default function InformationPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-12 p-6 pb-24">
      <section className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 md:text-5xl">General Safety Tips</h1>
        
        <div className="prose prose-lg mt-8 max-w-none text-gray-800">
          <p className="text-lg font-medium text-gray-900">
            Before beginning any exercise program, make sure to talk to your doctor, medical team, and support system or caregivers. <strong>Start exercising only when you get an okay from your medical team.</strong>
          </p>
          
          <p>
            If you're feeling unsure about where to begin or what activities are best for you, start making small changes to your daily routine. For example, try a 5-minute exercise after waking up. These small adjustments will help you build habits that boost your daily activity levels. Remember, it doesn't have to be complicated or time-consuming – in fact, it shouldn't be.
          </p>
          
          <ul className="mt-4 list-none space-y-2">
            <li className="flex items-start">
              <span className="mr-2 text-primary">•</span>
              <span><strong>Start small activities and prioritize safety first.</strong></span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-primary">•</span>
              <span>Pay attention to your body and keep track of your progress. Every day is different - some days you'll feel more energetic, while others you might feel less so.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-primary">•</span>
              <span><strong>Be kind to your body.</strong></span>
            </li>
          </ul>
        </div>
      </section>

      <section className="grid gap-6 pt-6 md:grid-cols-3">
        <Link href="/information/questions" className="block appearance-none transition-transform hover:-translate-y-1">
          <Card className="h-full border border-gray-200 bg-white transition-shadow hover:shadow-lg cursor-pointer">
            <CardHeader className="pb-3 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <FaQuestionCircle className="h-7 w-7 text-primary" />
              </div>
              <CardTitle className="text-xl text-gray-900">Questions to Ask</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base text-gray-600">
                Assess your risks safely. Find out what you need to evaluate before starting activities.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/information/group-activities" className="block appearance-none transition-transform hover:-translate-y-1">
          <Card className="h-full border border-gray-200 bg-white transition-shadow hover:shadow-lg cursor-pointer">
            <CardHeader className="pb-3 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10">
                <FaUsers className="h-7 w-7 text-green-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">Group Activities</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base text-gray-600">
                Safety tips needed primarily when participating in collective or group sports alongside others.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/information/solo-activities" className="block appearance-none transition-transform hover:-translate-y-1">
          <Card className="h-full border border-gray-200 bg-white transition-shadow hover:shadow-lg cursor-pointer">
            <CardHeader className="pb-3 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10">
                <FaUser className="h-7 w-7 text-amber-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">Solo Activities</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base text-gray-600">
                Discover the best practices, precautions, and rules when engaging in activities on your own.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
      </section>
    </div>
  );
}
