import Link from "next/link";

export default function Page() {
  return <div className="space-y-4 p-8 text-foreground">
    <h1 className="text-xl font-semibold">Sign up with email</h1>
    <p>Email is the available signup method for EpiMove.</p>
    <Link className="inline-block rounded-md bg-primary px-4 py-3 text-primary-foreground" href="/signup/email">Continue with email</Link>
  </div>;
}
