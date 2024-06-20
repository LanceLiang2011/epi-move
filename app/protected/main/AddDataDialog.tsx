import React, { ReactNode } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Toaster } from "@/components/ui/toaster";

interface Props {
  children: ReactNode;
  title: string;
  description: string;
}

export default function AddDataDialog({ children, title, description }: Props) {
  return (
    <Dialog>
      <DialogTrigger className=" flex-1 ">
        <Card className="transparent-card ">
          <CardHeader>
            <CardTitle className="mb-2 text-xl text-background">
              {title}
            </CardTitle>
            <CardDescription className="text-background">
              {description}
            </CardDescription>
          </CardHeader>
        </Card>
      </DialogTrigger>
      <DialogContent className=" bg-white text-background">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-gray-800">
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
        <Toaster />
      </DialogContent>
    </Dialog>
  );
}
