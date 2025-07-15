"use client";

import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  Image,
  SimpleGrid,
  List,
  ListItem,
  ListIcon,
  VStack,
  useColorModeValue,
  Icon,
  Stack,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { CheckIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  FaPrint,
  FaLeaf,
  FaBolt,
  FaMoneyBillWave,
  FaClock,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { logoFont } from "../../font";
import { ReactSVG } from "react-svg";
import useTranslation from "next-translate/useTranslation";
import LanguageSwitcher from "@/component/language-switcher";
import MotionButton from "@/component/motion-button";
import Link from "next/link";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

interface FeatureCardProps {
  icon: React.ComponentType;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <MotionBox
      whileHover={{ y: -5 }}
      rounded="xl"
      p={5}
      shadow="md"
      borderWidth="1px"
      bg={useColorModeValue("white", "gray.800")}
    >
      <Flex direction="column" align="center" textAlign="center">
        <Icon as={icon} boxSize={12} color="purple.500" mb={4} />
        <Heading fontSize="xl" fontWeight="semibold" mb={2}>
          {title}
        </Heading>
        <Text fontSize="md" color={useColorModeValue("gray.600", "gray.400")}>
          {description}
        </Text>
      </Flex>
    </MotionBox>
  );
};

export default function PrinterPage() {
  const { t, lang } = useTranslation("main");
  const bgColor = useColorModeValue("purple.50", "gray.900");
  const galleryBg = useColorModeValue("white", "gray.800");

  // Modal state for zoom
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedImg, setSelectedImg] = React.useState<string | null>(null);
  const openModal = (img: string) => {
    setSelectedImg(img);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setSelectedImg(null);
  };

  const features = [
    {
      icon: FaPrint,
      title: t("printer.features.cards.instantPrinting.title"),
      description: t("printer.features.cards.instantPrinting.description"),
    },
    {
      icon: FaLeaf,
      title: t("printer.features.cards.ecoFriendly.title"),
      description: t("printer.features.cards.ecoFriendly.description"),
    },
    {
      icon: FaBolt,
      title: t("printer.features.cards.lowEnergy.title"),
      description: t("printer.features.cards.lowEnergy.description"),
    },
    {
      icon: FaMoneyBillWave,
      title: t("printer.features.cards.costEffective.title"),
      description: t("printer.features.cards.costEffective.description"),
    },
    {
      icon: FaClock,
      title: t("printer.features.cards.fastSetup.title"),
      description: t("printer.features.cards.fastSetup.description"),
    },
  ];

  const pricingOptions = [
    {
      perDay: t("printer.pricing.perDay"),
      price: 200,
      title: t("printer.pricing.packages.standard.title"),
      description: t("printer.pricing.packages.standard.description"),
      features: t(
        "printer.pricing.packages.standard.features",
        {},
        { returnObjects: true }
      ) as string[],
    },
  ];
  return (
    <Box bgColor={bgColor} minH="100vh">
      <Container maxW="7xl">
        {/* Header */}
        <Box
          as="header"
          position="sticky"
          top={0}
          zIndex={10}
          w="100vw"
          left={0}
          right={0}
          marginLeft="calc(-50vw + 50%)"
          marginRight="calc(-50vw + 50%)"
          backdropFilter="blur(10px)"
          bg={useColorModeValue(
            "rgba(255, 255, 255, 0.8)",
            "rgba(26, 32, 44, 0.8)"
          )}
          borderBottom="1px"
          borderColor={useColorModeValue("gray.200", "gray.700")}
        >
          <Container maxW="7xl">
            <Flex justify="space-between" align="center" py={4} px={6}>
              <Link href={`/${lang}`} style={{ textDecoration: "none" }}>
                <Box
                  className={logoFont.className}
                  display="flex"
                  alignItems="center"
                  gap={2}
                  fontSize="xl"
                  cursor="pointer"
                >
                  <ReactSVG
                    beforeInjection={(svg) => {
                      svg.setAttribute("style", "width: 30px");
                      svg.setAttribute("fill", "black");
                    }}
                    src="/logo.svg"
                  />
                  Flybooth Printer
                </Box>
              </Link>
              <LanguageSwitcher currentLang={lang} chevronColor="black" />
            </Flex>
          </Container>
        </Box>

        {/* Featured Pricing Section - Moved to Top */}
        <Box
          py={16}
          mt={10}
          rounded="lg"
          bg="purple.600"
          color="white"
          px={{ base: 4, md: 10 }}
        >
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={10}
            alignItems="center"
          >
            <Box
              textAlign={{ base: "center", lg: "left" }}
              mb={{ base: 10, lg: 0 }}
            >
              <Heading size="2xl" mb={6}>
                {t("printer.pricing.title")}
              </Heading>
              <Text fontSize="xl" mb={8} maxW="2xl">
                {t("printer.pricing.subtitle")}
              </Text>
              <MotionButton
                size="lg"
                colorScheme="white"
                variant="outline"
                _hover={{ bg: "white", color: "purple.600" }}
                as="a"
                href="mailto:contact@h2t.club"
              >
                {t("printer.cta.button")}
              </MotionButton>
            </Box>
            <Flex justify="center">
              <MotionBox
                whileHover={{
                  y: -10,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
                maxW="400px"
                w="full"
                rounded="lg"
                overflow="hidden"
                borderWidth="1px"
                p={8}
                bg={useColorModeValue("white", "gray.800")}
                color={useColorModeValue("gray.800", "white")}
                transform="scale(1.05)"
              >
                <Box mb={4} textAlign="center">
                  <Text fontSize="6xl" fontWeight="bold" color="purple.500">
                    ${pricingOptions[0].price}
                  </Text>
                  <Text
                    fontSize="md"
                    color={useColorModeValue("gray.600", "gray.400")}
                  >
                    {pricingOptions[0].perDay}
                  </Text>
                </Box>
                <Heading as="h3" size="lg" mb={4} textAlign="center">
                  {pricingOptions[0].title}
                </Heading>
                <Text
                  color={useColorModeValue("gray.600", "gray.400")}
                  mb={6}
                  textAlign="center"
                >
                  {pricingOptions[0].description}
                </Text>
                <Divider mb={6} />
                <List spacing={3}>
                  {pricingOptions[0].features.map(
                    (feature: string, index: number) => (
                      <ListItem key={index}>
                        <ListIcon as={CheckIcon} color="purple.500" />
                        {feature}
                      </ListItem>
                    )
                  )}
                </List>
              </MotionBox>
            </Flex>
          </SimpleGrid>
        </Box>

        {/* Picture Gallery Section */}
        <Box py={16}>
          <VStack spacing={4} textAlign="center" mb={10}>
            <Heading as="h2" size="xl">
              {t("printer.gallery.title")}
            </Heading>
            <Text
              fontSize="lg"
              color={useColorModeValue("gray.600", "gray.400")}
            >
              {t("printer.gallery.subtitle")}
            </Text>
          </VStack>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
            {[
              "IMG_3449.jpg",
              "IMG_3454.jpg",
              "IMG_3601.jpg",
              "IMG_3602.jpg",
            ].map((img, idx) => (
              <MotionBox
                key={img}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 24px rgba(128, 90, 213, 0.2)",
                }}
                rounded="xl"
                overflow="hidden"
                shadow="md"
                borderWidth="1px"
                bg={galleryBg}
                p={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                onClick={() => openModal(img)}
                tabIndex={0}
                aria-label={`Zoom photo ${idx + 1}`}
              >
                <Image
                  src={`/printer/${img}`}
                  alt={`Printer photo ${idx + 1}`}
                  objectFit="cover"
                  w="100%"
                  h={{ base: "200px", md: "250px" }}
                  rounded="lg"
                  transition="all 0.3s"
                />
              </MotionBox>
            ))}
            {/* Modal for zoomed image */}
            <Modal isOpen={isOpen} onClose={closeModal} isCentered size="xl">
              <ModalOverlay />
              <ModalContent bg={galleryBg}>
                <ModalCloseButton color="purple.500" />
                <ModalBody
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  p={4}
                >
                  {selectedImg && (
                    <Image
                      src={`/printer/${selectedImg}`}
                      alt="Zoomed printer photo"
                      maxW="100%"
                      maxH={{ base: "60vh", md: "80vh" }}
                      rounded="lg"
                      boxShadow="lg"
                      transform="scale(1.5)"
                      transformOrigin="center"
                    />
                  )}
                </ModalBody>
              </ModalContent>
            </Modal>
          </SimpleGrid>
        </Box>

        {/* Features Section */}
        <Box py={16}>
          <VStack spacing={4} textAlign="center" mb={10}>
            <Heading as="h2" size="2xl">
              {t("printer.features.title")}
            </Heading>
            <Text
              fontSize="lg"
              color={useColorModeValue("gray.600", "gray.400")}
              maxW="3xl"
            >
              {t("printer.features.subtitle")}
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} mt={10}>
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </SimpleGrid>
        </Box>

        {/* How It Works */}
        <Box py={16}>
          <VStack spacing={4} textAlign="center" mb={16}>
            <Heading as="h2" size="2xl">
              {t("printer.howItWorks.title")}
            </Heading>
            <Text
              fontSize="lg"
              color={useColorModeValue("gray.600", "gray.400")}
              maxW="3xl"
            >
              {t("printer.howItWorks.subtitle")}
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <MotionFlex
              whileHover={{ y: -5 }}
              direction="column"
              align="center"
              textAlign="center"
            >
              <Box
                rounded="full"
                bg="purple.100"
                p={4}
                mb={6}
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="80px"
                h="80px"
              >
                <Text fontSize="3xl" fontWeight="bold" color="purple.500">
                  1
                </Text>
              </Box>
              <Heading as="h3" size="lg" mb={4}>
                {t("printer.howItWorks.steps.step1.title")}
              </Heading>
              <Text color={useColorModeValue("gray.600", "gray.400")}>
                {t("printer.howItWorks.steps.step1.description")}
              </Text>
            </MotionFlex>

            <MotionFlex
              whileHover={{ y: -5 }}
              direction="column"
              align="center"
              textAlign="center"
            >
              <Box
                rounded="full"
                bg="purple.100"
                p={4}
                mb={6}
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="80px"
                h="80px"
              >
                <Text fontSize="3xl" fontWeight="bold" color="purple.500">
                  2
                </Text>
              </Box>
              <Heading as="h3" size="lg" mb={4}>
                {t("printer.howItWorks.steps.step2.title")}
              </Heading>
              <Text color={useColorModeValue("gray.600", "gray.400")}>
                {t("printer.howItWorks.steps.step2.description")}
              </Text>
            </MotionFlex>

            <MotionFlex
              whileHover={{ y: -5 }}
              direction="column"
              align="center"
              textAlign="center"
            >
              <Box
                rounded="full"
                bg="purple.100"
                p={4}
                mb={6}
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="80px"
                h="80px"
              >
                <Text fontSize="3xl" fontWeight="bold" color="purple.500">
                  3
                </Text>
              </Box>
              <Heading as="h3" size="lg" mb={4}>
                {t("printer.howItWorks.steps.step3.title")}
              </Heading>
              <Text color={useColorModeValue("gray.600", "gray.400")}>
                {t("printer.howItWorks.steps.step3.description")}
              </Text>
            </MotionFlex>
          </SimpleGrid>
        </Box>

        {/* Footer */}
        <Box as="footer" py={10} textAlign="center">
          <Text color={useColorModeValue("gray.600", "gray.400")}>
            © {new Date().getFullYear()} Flybooth. {t("printer.footer.rights")}
          </Text>
          <Text
            fontSize="sm"
            mt={2}
            color={useColorModeValue("gray.500", "gray.500")}
          >
            {t("printer.footer.codedWithLove")}
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
