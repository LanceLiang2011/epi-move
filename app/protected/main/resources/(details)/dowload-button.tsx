"use client";
import { motion } from "framer-motion";
import React from "react";
interface Props {
  link: string;
}

export default function DowloadButton({ link }: Props) {
  return (
    <motion.a
      whileHover={{ y: -2 }}
      whileTap={{ y: 1 }}
      className="rounded-lg bg-primary px-8 py-4 text-2xl font-semibold hover:shadow-md"
      href={link}
      target="_blank"
    >
      Download
    </motion.a>
  );
}
