"use client";
import { motion } from "framer-motion";
import React from "react";

export default function DowloadButton() {
  return (
    <motion.a
      whileHover={{ y: -2 }}
      whileTap={{ y: 1 }}
      className="rounded-lg bg-primary px-8 py-4 text-2xl font-semibold hover:shadow-md"
      href="https://www.epilepsy.com/preparedness-safety/action-plans#:~:text=Local%20Epilepsy%20Foundation-,How%20do%20I%20make%20a%20Seizure%20Action%20Plan%3F,-Use%20these%20forms"
      target="_blank"
    >
      Dowload
    </motion.a>
  );
}
