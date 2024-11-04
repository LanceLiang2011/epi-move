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
          autoCapitalize="off"
          required
          value={"test@test.com"} // TODO: Remove me later
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="mb-6 rounded-md border bg-inherit px-4 py-2"
          type="password"
          name="password"
          placeholder="••••••••"
          autoCapitalize="off"
          required
          value={"123456"} // TODO: Remove me later
        />
        <div className=" mb-2 flex justify-end">
          <text className="cursor-pointer align-text-bottom text-sm font-light hover:text-gray-200 active:text-gray-200">
            Forgot password?
          </text>
        </div>
        <SubmitButton
          formAction={signIn}
          className="mb-2 rounded-md bg-primary px-4 py-2 text-foreground"
          pendingText="Signing In..."
        >
          Log In
        </SubmitButton>
        {searchParams?.message && (
          <p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">
            {searchParams.message}
          </p>
        )}
      </form>
      <div className=" flex items-center justify-center gap-2 py-4">
        <div className=" h-1 w-6 bg-foreground"></div>
        <p className="text-foreground">Or</p>
        <div className=" h-1 w-6 bg-foreground"></div>
      </div>
      <div className=" flex flex-col items-center justify-center gap-6 pb-16 pt-6">
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
