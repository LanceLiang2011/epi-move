import Heading from "@/components/navigations/Heading";
import React from "react";
import { FiTarget } from "react-icons/fi";
import ActivitiesGrid from "./ActivitiesGrid";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const keyword = (await searchParams).keyword as string;

  return (
    <div>
      <Heading
        title="activities to enjoy"
        placeholder="Search for activities"
        Icon={<FiTarget size={60} />}
      />
      <ActivitiesGrid keyword={keyword} />
    </div>
  );
}
