import Logo from "@/components/Logo";
import { SubmitButton } from "@/components/auth/submit-button";
import { signUp } from "@/lib/actions";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <Logo />
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <div className=" flex justify-end mb-2">
          <text className="font-light text-sm align-text-bottom hover:text-gray-200 active:text-gray-200 cursor-pointer">
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
          className="bg-primary rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Signing Up..."
        >
          Sign Up
        </SubmitButton>
        <Link
          className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2 text-center"
          href={`/`}
        >
          Back
        </Link>
      </form>
    </div>
  );
}
