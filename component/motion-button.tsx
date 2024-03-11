import { Button } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function MotionButton({ children, ...rest }: any) {
  return (
    <Button
      as={motion.button}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition="linear"
      {...rest}
    >
      {children}
    </Button>
  );
}
