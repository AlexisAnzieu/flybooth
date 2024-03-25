"use client";

import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import {
  Box,
  Button,
  Center,
  Heading,
  Modal,
  ModalContent,
  ModalOverlay,
  Spinner,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import Image from "next/image";

import { BREAKPOINT_VALUES } from "@/lib/constants";
import { useState } from "react";
import { PageProps } from "../page";
import { Resource } from "@/app/[lang]/api/cloudinary/route";

export default function Gallery({ params: { flyboothId } }: PageProps) {
  const numColumns = useBreakpointValue(BREAKPOINT_VALUES);
  const [hoveredId, setHoveredId] = useState(null);
  const [pictureUrl, setPictureUrl] = useState("");

  const { data, isLoading } = useSWR(
    `/api/cloudinary?flyboothId=${flyboothId}&maxResults=500`,
    (url) =>
      fetcher(url).then((data) =>
        data.resources.map((image: Resource) => ({
          id: image.public_id,
          src: image.secure_url,
          thumb: image.public_id,
        }))
      )
  );

  const createArchive = async () => {
    const res = await fetch(`/api/cloudinary`, {
      method: "POST",
      body: JSON.stringify({ flyboothId }),
    });
    const url = await res.json();
    window.open(url, "_blank");
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const openModal = (pictureUrl: string) => {
    setPictureUrl(pictureUrl);
    onOpen();
  };

  const createDownloadLink = (publicId: string) => {
    return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/fl_attachment/${publicId}.jpg`;
  };

  if (isLoading) {
    return (
      <Center p={100}>
        <Heading pr={10}>Photos en cours de chargement</Heading>
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
      <Center p={100}>
        <Heading pr={10}>
          {"Personne n'a posté de photos pour l'instant"}
        </Heading>
      </Center>
    );
  }

  return (
    <Box>
      <Box
        bgColor={"black"}
        display={"grid"}
        minH={"100vh"}
        gridTemplateColumns={`repeat(${numColumns}, 1fr)`}
        gap={4}
        p={4}
      >
        {data.map((image: any) => (
          <Box
            cursor={"pointer"}
            onClick={() => openModal(image.src)}
            key={image.src}
            position="relative"
            onMouseEnter={() => setHoveredId(image.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <Image
              alt={image.src}
              width={500}
              height={500}
              style={{
                borderRadius: 20,
                objectFit: "cover",
              }}
              src={image.src}
            />
            {hoveredId === image.id && (
              <Box
                cursor={"pointer"}
                py={1}
                px={3}
                fontSize={30}
                color={"white"}
                style={{ backgroundColor: "rgba(107, 70, 193, 0.9)" }}
                onClick={(event) => {
                  event.stopPropagation();
                  window.open(createDownloadLink(image.id), "_blank");
                }}
                position="absolute"
                bottom="2"
                right="3"
                borderRadius={15}
              >
                <DownloadIcon />
              </Box>
            )}
          </Box>
        ))}
      </Box>

      {data.length < 30 && (
        <Box
          display={"flex"}
          height={100}
          justifyContent={"center"}
          alignItems={"center"}
          width={"100vw"}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
          bottom={0}
          position={"fixed"}
        >
          <Button
            onClick={() => createArchive()}
            colorScheme="purple"
            size={"lg"}
            fontSize={30}
          >
            Télécharger {data.length} photos
            <DownloadIcon ml={4} />
          </Button>
        </Box>
      )}

      <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={"20px"}>
          <img src={pictureUrl} alt="" />
        </ModalContent>
      </Modal>
    </Box>
  );
}
