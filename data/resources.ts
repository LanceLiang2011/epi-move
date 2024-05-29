import { Goal, Star, BadgeAlert, type LucideIcon } from "lucide-react";
import { IoTennisballSharp } from "react-icons/io5";
import type { IconType } from "react-icons";

interface Resource {
  name: string;
  slug: string;
  url: string;
  description: string;
  Icon: LucideIcon | IconType | string;
}

export const resources: Resource[] = [
  {
    name: "Preparing for seizures",
    slug: "preparing-for-seizures",
    url: "preparing-for-seizures",
    description: "Epilepsy Foundation Seizure Action Plan",
    Icon: BadgeAlert,
  },
  {
    name: "Setting goals",
    slug: "setting-goals",
    url: "setting-goals",
    description: "Discover tools and tips to set realistic goals",
    Icon: Goal,
  },
  {
    name: "Nearby activity centres",
    slug: "nearby-activity-centres",
    url: "nearby-activity-centres",
    description: "Find out where you can participate in physical activities",
    Icon: "/images/jooay.svg",
  },

  {
    name: "Success stories",
    slug: "success-stories",
    url: "success-stories",
    description: "Be inspired by success stories of individuals with epilepsy",
    Icon: Star,
  },
];
