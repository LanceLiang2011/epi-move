import React from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div>
      <Link
        className="absolute top-3 left-3  z-10"
        href={`/protected/main/activities`}
      >
        <Button
          className="rounded-full opacity-60"
          variant="outline"
          size="icon"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </Link>

      <div>{children}</div>
    </div>
  );
}
