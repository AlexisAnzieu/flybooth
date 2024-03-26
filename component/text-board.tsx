"use client";

import { formatTime } from "@/lib/date";
import fetcher from "@/lib/fetcher";
import { Box, Center, Heading, Spinner } from "@chakra-ui/react";
import useSWR from "swr";
import QrCode, { PAGES } from "./qr-code";
import useTranslation from "next-translate/useTranslation";

type Text = {
  message: string;
  author: string;
  created_at: string;
  id: number;
};

export default function TextBoard({ flyboothId }: { flyboothId: string }) {
  const { t } = useTranslation("main");
  const { data, isLoading } = useSWR<Text[]>(
    `/api/texts?flyboothId=${flyboothId}`,
    fetcher,
    {
      refreshInterval: 2000,
    }
  );

  if (isLoading) {
    return (
      <Center p={100} color={"white"}>
        <Heading pr={10}>{t("textBoard.loading")}</Heading>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="white"
          color="purple.500"
          size="xl"
        />
      </Center>
    );
  }

  if (!data?.length) {
    return (
      <Center p={100} flexDir={"column"}>
        <Heading textAlign={"center"} size={"3xl"} pb={10}>
          {t("textBoard.noPhotos")}
        </Heading>
        <QrCode redirectTo={PAGES.upload} flyboothId={flyboothId} />
      </Center>
    );
  }
  return (
    <Box borderRadius={"3xl"} color={"white"} px={10} overflow={"hidden"}>
      {data?.map((text) => (
        <Box key={text.id} py={15}>
          <Heading size="lg">
            {formatTime(text.created_at)} - {text.author.substring(0, 30)}
          </Heading>
          <Heading py={2} size={"2xl"}>
            {text.message.substring(0, 200)}
          </Heading>
        </Box>
      ))}
    </Box>
  );
}
