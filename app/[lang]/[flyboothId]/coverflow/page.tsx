"use client";

import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Center, Heading, Spinner } from "@chakra-ui/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";
import QrCode, { PAGES } from "@/component/qr-code";
import { PageProps } from "../page";
import useTranslation from "next-translate/useTranslation";

const SLIDE_PER_VIEW = 3;

export default function Gallery({ params: { flyboothId } }: PageProps) {
  const { t } = useTranslation("main");
  const { data, isLoading, error } = useSWR(
    `/api/cloudinary?flyboothId=${flyboothId}`,
    (url) =>
      fetcher(url).then((data) =>
        data.resources.map((image: any) => ({
          id: image.public_id,
          src: image.secure_url,
          thumb: image.public_id,
        }))
      ),
    {
      refreshInterval: 10 * 1000,
    }
  );

  if (isLoading) {
    return (
      <Center p={100}>
        <Heading pr={10}>{t("coverflow.loading")}</Heading>
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

  if (!data?.length || error) {
    return (
      <Center p={100} flexDir={"column"}>
        <Heading pb={10}>{t("coverflow.noPhotos")}</Heading>
        <Box>
          <QrCode redirectTo={PAGES.upload} flyboothId={flyboothId} />
        </Box>
      </Center>
    );
  }

  return (
    <Box
      bgColor={"black"}
      height={"100vh"}
      display={"flex"}
      alignItems={"center"}
    >
      <Swiper
        style={{
          paddingTop: 55,
          paddingBottom: 55,
          paddingLeft: 20,
          paddingRight: 20,
        }}
        centeredSlides={true}
        effect={"coverflow"}
        modules={[Autoplay, EffectCoverflow]}
        slidesPerView={Math.min(data.length, SLIDE_PER_VIEW)}
        autoplay={{
          delay: 2000,
        }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
      >
        {data.map((image: any) => (
          <SwiperSlide
            key={image.id}
            style={{
              alignSelf: "center",
            }}
          >
            <img
              width={"650vh"}
              alt={image.src}
              style={{
                borderRadius: 20,
              }}
              src={image.src}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
