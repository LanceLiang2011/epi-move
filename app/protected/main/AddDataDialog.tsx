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

interface Props {
  children: ReactNode;
  title: string;
  description: string;
}

export default function AddDataDialog({ children, title, description }: Props) {
  return (
    <Dialog>
      <DialogTrigger className=" flex-1">
        <Card className="transparent-card">
          <CardHeader>
            <CardTitle className="mb-2 text-xl">{title}</CardTitle>
            <CardDescription className="text-gray-200">
              {description}
            </CardDescription>
          </CardHeader>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
