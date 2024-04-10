import Heading from "@/components/navigations/Heading";
import React from "react";
import { FiTarget } from "react-icons/fi";
import ActivitiesGrid from "./ActivitiesGrid";

export default function Page() {
  return (
    <div>
      <Heading
        title="activity to enjoy"
        placeholder="Search for activities"
        Icon={<FiTarget size={60} />}
      />
      <ActivitiesGrid />
    </div>
  );
}
