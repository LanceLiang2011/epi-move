import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Hamburger() {
  return (
    <Sheet>
      <SheetTrigger>
        <GiHamburgerMenu />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>What are we going to up here?</SheetTitle>
          <SheetDescription>
            This might be more tricky in the mobile app as this may force
            different layers of Nav
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
