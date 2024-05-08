import Logo from "@/components/Logo";
import { SubmitButton } from "@/components/auth/submit-button";
import { signUp } from "@/lib/actions";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <form className="flex w-full flex-1 flex-col justify-center gap-2 text-foreground animate-in">
        <Logo />
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="mb-6 rounded-md border bg-inherit px-4 py-2"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="username">
          User Name
        </label>
        <input
          className="mb-6 rounded-md border bg-inherit px-4 py-2"
          name="username"
          placeholder="Joe Doe"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="mb-6 rounded-md border bg-inherit px-4 py-2"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <div className=" mb-2 flex justify-end">
          <text className="cursor-pointer align-text-bottom text-sm font-light hover:text-gray-200 active:text-gray-200">
            Forgot password?
          </text>
        </div>
        {/* <SubmitButton
          formAction={signIn}
          className="bg-primary rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Signing In..."
        >
          Log In
        </SubmitButton> */}
        <SubmitButton
          formAction={signUp}
          className="mb-2 rounded-md bg-primary px-4 py-2 text-foreground"
          pendingText="Signing Up..."
        >
          Sign Up
        </SubmitButton>
        <Link
          className="mb-2 rounded-md border border-foreground/20 px-4 py-2 text-center text-foreground"
          href={`/`}
        >
          Back
        </Link>
      </form>
    </div>
  );
}
