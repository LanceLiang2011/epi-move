import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null; // Don't show anything when not logged in
  }

  const { data: userdata } = await supabase
    .from("users")
    .select("username")
    .eq("id", user?.id);

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/main/activities");
  };

  return (
    <div className="flex items-center gap-4">
      Hello, {userdata?.at(0)?.username || ""}!
      <form action={signOut}>
        <button className="rounded-md bg-btn-background px-4 py-2 no-underline hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  );
}
