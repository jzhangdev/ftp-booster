import { motion } from "motion/react";
import React, { PropsWithChildren } from "react";

export const MessageMotion = ({ children }: PropsWithChildren<unknown>) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{
      duration: 0.3,
    }}
  >
    {children}
  </motion.div>
);
