"use client";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

export default function Hamburger() {
  return (
    <Sheet>
      <SheetTrigger>
        <GiHamburgerMenu />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <br />
          <SheetDescription className=" flex flex-col gap-12">
            <SheetPrimitive.Close asChild>
              <Link
                className=" text-lg font-bold text-foreground "
                href={`/protected/main/references`}
              >
                References
              </Link>
            </SheetPrimitive.Close>
            <SheetPrimitive.Close asChild>
              <Link
                className=" text-lg font-bold text-foreground "
                href={`/protected/main/disclaimer`}
              >
                Disclaimer
              </Link>
            </SheetPrimitive.Close>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
