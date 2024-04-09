import React, { type ComponentProps } from "react";
import { createClient } from "@/lib/supabase/server";

type Props = ComponentProps<"span">;

export default async function Username({ ...rest }: Props) {
  const supabse = createClient();

  const {
    data: { user },
  } = await supabse.auth.getUser();
  return <span {...rest}>{user?.email ?? "Visitor"}</span>;
}
