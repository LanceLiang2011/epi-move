import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userdata } = await supabase
    .from("users")
    .select("username")
    .eq("id", user?.id);

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/");
  };

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {userdata?.at(0)?.username || ""}!
      <form action={signOut}>
        <button className="rounded-md bg-btn-background px-4 py-2 no-underline hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/"
      className="flex rounded-md bg-btn-background px-3 py-2 no-underline hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}
