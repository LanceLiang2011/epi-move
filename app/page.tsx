import Logo from "@/components/Logo";
import { SubmitButton } from "@/components/auth/submit-button";
import { signIn } from "@/lib/actions";
import IconButtonText from "@/components/icon-button-text";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
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
        <SubmitButton
          formAction={signIn}
          className="bg-primary rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Signing In..."
        >
          Log In
        </SubmitButton>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
      <div className=" flex justify-center items-center gap-2 py-4">
        <div className=" h-1 w-6 bg-foreground"></div>
        <p className="text-foreground">Or</p>
        <div className=" h-1 w-6 bg-foreground"></div>
      </div>
      <div className=" flex flex-col gap-6 items-center justify-center pt-6 pb-16">
        <p>Sign up with</p>
        <div className="flex gap-6">
          <IconButtonText
            label="Phone"
            href="/signup/phone"
            Icon={<FaPhoneAlt />}
          />
          <IconButtonText
            label="Email"
            href="/signup/email"
            Icon={<MdEmail />}
          />
          <IconButtonText
            label="Others"
            href="/signup/others"
            Icon={<HiOutlineDotsHorizontal />}
          />
        </div>
      </div>
    </div>
  );
}
