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
          <SheetDescription>
            <SheetPrimitive.Close asChild>
              <Link
                className=" font-bold text-lg text-foreground "
                href={`/protected/main/references`}
              >
                References
              </Link>
            </SheetPrimitive.Close>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
