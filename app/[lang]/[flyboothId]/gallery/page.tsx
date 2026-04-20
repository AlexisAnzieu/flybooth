"use client";

import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import {
  Box,
  Button,
  Center,
  Heading,
  Icon,
  IconButton,
  Link,
  Modal,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  DownloadIcon,
} from "@chakra-ui/icons";
import Image from "next/image";

import { BREAKPOINT_VALUES } from "@/lib/constants";
import { useCallback, useEffect, useState } from "react";
import type { PageProps } from "../page";
import type { Resource } from "@/app/api/cloudinary/route";
import useTranslation from "next-translate/useTranslation";
import { FaEnvelope, FaGithub } from "react-icons/fa";

export default function Gallery({ params: { flyboothId } }: PageProps) {
  const { t } = useTranslation("main");
  const numColumns = useBreakpointValue(BREAKPOINT_VALUES);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const { data, isLoading } = useSWR(
    `/api/cloudinary?flyboothId=${flyboothId}&maxResults=500`,
    (url) =>
      fetcher(url).then((data) =>
        data.resources.map((image: Resource) => ({
          id: image.public_id,
          src: image.secure_url,
          thumb: image.public_id,
        })),
      ),
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

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsZoomed(false);
    onOpen();
  };

  const handleClose = useCallback(() => {
    setIsZoomed(false);
    onClose();
  }, [onClose]);

  const goToPrev = useCallback(() => {
    if (!data) return;
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
  }, [data]);

  const goToNext = useCallback(() => {
    if (!data) return;
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev + 1) % data.length);
  }, [data]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrev();
      else if (e.key === "ArrowRight") goToNext();
      else if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, goToPrev, goToNext, handleClose]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToNext();
      else goToPrev();
    }
    setTouchStartX(null);
  };

  const createDownloadLink = (publicId: string) => {
    return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/fl_attachment/${publicId}.jpg`;
  };

  const currentImage = data?.[currentIndex];

  if (isLoading) {
    return (
      <Center p={100}>
        <Heading pr={10}>{t("gallery.loading")}</Heading>
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
        <Heading pr={10}>{t("gallery.noPhotos")}</Heading>
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
        {data.map(
          (
            image: { id: string; src: string; thumb: string },
            index: number,
          ) => (
            <Box key={image.src}>
              <Box
                position={"relative"}
                onMouseEnter={() => setHoveredId(image.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Image
                  alt={image.src}
                  width={500}
                  height={500}
                  style={{
                    cursor: "pointer",
                    borderRadius: 20,
                    objectFit: "cover",
                  }}
                  src={image.src}
                  onClick={() => openModal(index)}
                />
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
                  opacity={{
                    base: "1",
                    md: hoveredId === image.id ? "1" : "0.5",
                  }}
                  transition="opacity 0.2s ease"
                >
                  <DownloadIcon />
                </Box>
              </Box>
            </Box>
          ),
        )}
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
      <Box
        color={"white"}
        backgroundColor={"black"}
        as={"footer"}
        display={"flex"}
        justifyContent={"space-evenly"}
        p={5}
      >
        <Box fontSize={27}>
          <Link href="mailto:contact@h2t.club">
            <Icon as={FaEnvelope} />
          </Link>
        </Box>
        <Box fontWeight={"600"} fontSize={20}>
          {t("landing.footer.codedWithLove")}
        </Box>

        <Box fontSize={27}>
          <Link href="https://github.com/AlexisAnzieu/flybooth">
            <Icon as={FaGithub} />
          </Link>
        </Box>
      </Box>

      <Modal size={"full"} isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay bg="blackAlpha.900" />
        <ModalContent
          bg="transparent"
          boxShadow="none"
          display="flex"
          alignItems="center"
          justifyContent="center"
          m={0}
        >
          {/* Close button */}
          <IconButton
            aria-label="Close"
            icon={<CloseIcon />}
            position="fixed"
            top={4}
            right={4}
            zIndex={10}
            colorScheme="whiteAlpha"
            onClick={handleClose}
            borderRadius="full"
            size="lg"
          />

          {/* Counter */}
          <Text
            position="fixed"
            top={5}
            left="50%"
            transform="translateX(-50%)"
            color="white"
            fontSize="sm"
            fontWeight="600"
            zIndex={10}
            bg="blackAlpha.600"
            px={3}
            py={1}
            borderRadius="full"
          >
            {currentIndex + 1} / {data?.length}
          </Text>

          {/* Download button (desktop only top-right) */}
          {currentImage && (
            <IconButton
              aria-label="Download"
              icon={<DownloadIcon />}
              position="fixed"
              top={4}
              right={16}
              mr={2}
              zIndex={10}
              colorScheme="purple"
              borderRadius="full"
              size="lg"
              display={{ base: "none", md: "flex" }}
              onClick={() =>
                window.open(createDownloadLink(currentImage.id), "_blank")
              }
            />
          )}

          {/* Prev arrow — hidden on mobile (swipe instead) */}
          <IconButton
            aria-label="Previous"
            icon={<ChevronLeftIcon boxSize={10} />}
            position="fixed"
            left={2}
            top="50%"
            transform="translateY(-50%)"
            zIndex={10}
            colorScheme="whiteAlpha"
            borderRadius="full"
            size="lg"
            display={{ base: "none", md: "flex" }}
            onClick={goToPrev}
          />

          {/* Image with swipe support */}
          {currentImage && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="100vw"
              height="100vh"
              onClick={() => setIsZoomed((z) => !z)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              cursor={{
                base: "default",
                md: isZoomed ? "zoom-out" : "zoom-in",
              }}
              overflow="hidden"
            >
              <Image
                src={currentImage.src}
                alt=""
                width={1200}
                height={1200}
                unoptimized
                style={{
                  maxWidth: isZoomed ? "none" : "90vw",
                  maxHeight: isZoomed ? "none" : "90vh",
                  width: isZoomed ? "auto" : undefined,
                  height: isZoomed ? "auto" : undefined,
                  transform: isZoomed ? "scale(2)" : "scale(1)",
                  transition: "transform 0.3s ease",
                  borderRadius: isZoomed ? 0 : 16,
                  objectFit: "contain",
                  userSelect: "none",
                  touchAction: "none",
                }}
              />
            </Box>
          )}

          {/* Next arrow — hidden on mobile (swipe instead) */}
          <IconButton
            aria-label="Next"
            icon={<ChevronRightIcon boxSize={10} />}
            position="fixed"
            right={2}
            top="50%"
            transform="translateY(-50%)"
            zIndex={10}
            colorScheme="whiteAlpha"
            borderRadius="full"
            size="lg"
            display={{ base: "none", md: "flex" }}
            onClick={goToNext}
          />

          {/* Mobile bottom bar: prev / download / next */}
          {currentImage && (
            <Box
              display={{ base: "flex", md: "none" }}
              position="fixed"
              bottom={0}
              left={0}
              right={0}
              zIndex={10}
              bg="blackAlpha.700"
              justifyContent="space-around"
              alignItems="center"
              py={3}
              px={6}
            >
              <IconButton
                aria-label="Previous"
                icon={<ChevronLeftIcon boxSize={8} />}
                colorScheme="whiteAlpha"
                borderRadius="full"
                size="lg"
                onClick={goToPrev}
              />
              <IconButton
                aria-label="Download"
                icon={<DownloadIcon />}
                colorScheme="purple"
                borderRadius="full"
                size="lg"
                onClick={() =>
                  window.open(createDownloadLink(currentImage.id), "_blank")
                }
              />
              <IconButton
                aria-label="Next"
                icon={<ChevronRightIcon boxSize={8} />}
                colorScheme="whiteAlpha"
                borderRadius="full"
                size="lg"
                onClick={goToNext}
              />
            </Box>
          )}
        </ModalContent>
      </Modal>
    </Box>
  );
}
