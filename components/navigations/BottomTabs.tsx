import Link from "next/link";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { FiCalendar } from "react-icons/fi";
import { createClient } from "@/lib/supabase/server";
import BottomTabsClient from "./BottomTabsClient";

export default async function BottomTabs() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let username = "Login";

  if (user) {
    const { data: userdata } = await supabase
      .from("users")
      .select("username")
      .eq("id", user.id)
      .single();

    username = userdata?.username || "User";
  }

  return <BottomTabsClient username={username} />;
}
