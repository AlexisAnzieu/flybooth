import TextBoard from "@/component/text-board";
import Time from "@/component/time";
import { Box } from "@chakra-ui/react";
import { PageProps } from "../page";

export default function TextPage({ params: { flyboothId } }: PageProps) {
  return (
    <Box minH={"100vh"} bgColor={"purple"} color={"white"}>
      <Box
        textAlign={"center"}
        pt={5}
        fontSize={"calc(30px + 1vw)"}
        fontWeight={"800"}
      >
        <Time />
      </Box>
      <TextBoard flyboothId={flyboothId} />
    </Box>
  );
}
