import Heading from "@/components/navigations/Heading";
import React from "react";
import { GiOpenBook } from "react-icons/gi";

export default function Page() {
  return (
    <div>
      <Heading
        title="resources"
        placeholder="Search for resources"
        Icon={<GiOpenBook size={60} />}
      />
    </div>
  );
}
