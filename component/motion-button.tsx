import { Button, ButtonProps } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionButton = motion(Button);

export default function CustomMotionButton({
  children,
  ...rest
}: ButtonProps & any) {
  return (
    <MotionButton
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "linear" }}
      {...rest}
    >
      {children}
    </MotionButton>
  );
}
