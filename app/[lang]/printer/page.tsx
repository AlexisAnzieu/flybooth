"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  Image,
  SimpleGrid,
  Badge,
  List,
  ListItem,
  ListIcon,
  VStack,
  useColorModeValue,
  Icon,
  Stack,
  Divider,
} from "@chakra-ui/react";
import { CheckIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { FaPrint, FaLeaf, FaBolt, FaMoneyBillWave, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";
import { logoFont } from "../../font";
import { ReactSVG } from "react-svg";
import useTranslation from "next-translate/useTranslation";
import LanguageSwitcher from "@/component/language-switcher";
import MotionButton from "@/component/motion-button";
import Link from "next/link";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionImage = motion(Image);

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

interface PricingCardProps {
  price: number;
  title: string;
  description: string;
  features: string[];
}

const PricingCard = ({ price, title, description, features }: PricingCardProps) => {
  return (
    <MotionBox
      whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
      maxW="330px"
      w="full"
      rounded="lg"
      overflow="hidden"
      borderWidth="1px"
      p={6}
      bg={useColorModeValue("white", "gray.800")}
    >
      <Box mb={4}>
        <Text fontSize="4xl" fontWeight="bold">
          ${price}
        </Text>
        <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>
          per day
        </Text>
      </Box>
      <Heading as="h3" size="md" mb={2}>
        {title}
      </Heading>
      <Text color={useColorModeValue("gray.600", "gray.400")} mb={6}>
        {description}
      </Text>
      <Divider mb={6} />
      <List spacing={3}>
        {features.map((feature: string, index: number) => (
          <ListItem key={index}>
            <ListIcon as={CheckIcon} color="purple.500" />
            {feature}
          </ListItem>
        ))}
      </List>
      <MotionButton
        colorScheme="purple"
        mt={8}
        size="lg"
        w="full"
        variant="solid"
      >
        Rent Now
      </MotionButton>
    </MotionBox>
  );
};

export default function PrinterPage() {
  const { t, lang } = useTranslation("main");
  const bgColor = useColorModeValue("purple.50", "gray.900");

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
      price: 49,
      title: t("printer.pricing.packages.basic.title"),
      description: t("printer.pricing.packages.basic.description"),
      features: [
        "1 Thermal Printer",
        "200 sheets of thermal paper",
        "24-hour rental",
        "Technical support",
        "Free shipping and return",
      ],
    },
    {
      price: 79,
      title: t("printer.pricing.packages.standard.title"),
      description: t("printer.pricing.packages.standard.description"),
      features: [
        "2 Thermal Printers",
        "500 sheets of thermal paper",
        "36-hour rental",
        "Priority technical support",
        "Free shipping and return",
        "Backup battery pack",
      ],
    },
    {
      price: 129,
      title: t("printer.pricing.packages.premium.title"),
      description: t("printer.pricing.packages.premium.description"),
      features: [
        "3 Thermal Printers",
        "1000 sheets of thermal paper",
        "48-hour rental",
        "24/7 premium support",
        "Express delivery and pickup",
        "Backup battery packs",
        "Custom branding on prints",
      ],
    },
  ];

  return (
    <Box bgColor={bgColor} minH="100vh">
      <Container maxW="7xl">
        {/* Header */}
        <Box as="header" w="100%" pt={3} textAlign="right">
          <LanguageSwitcher currentLang={lang} />
        </Box>

        {/* Hero Section */}
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          py={16}
        >
          <Box maxW={{ base: "100%", md: "50%" }} mb={{ base: 10, md: 0 }}>
            <Box
              className={logoFont.className}
              display="flex"
              alignItems="center"
              gap={3}
              fontSize={{ base: 40, md: 50 }}
              mb={4}
            >
              <ReactSVG
                beforeInjection={(svg) => {
                  svg.setAttribute("style", "width: 60px");
                }}
                src="/logo.svg"
              />
              Flybooth Printer
            </Box>
            <Heading
              as="h1"
              size="xl"
              mb={6}
              lineHeight="shorter"
              fontWeight="bold"
            >
              {t("printer.hero.title")}
            </Heading>
            <Text fontSize="xl" mb={8} color={useColorModeValue("gray.600", "gray.400")}>
              {t("printer.hero.subtitle")}
            </Text>
            <Stack direction={{ base: "column", sm: "row" }} spacing={4}>
              <MotionButton
                size="lg"
                colorScheme="purple"
                fontSize="md"
                as={Link}
                href="#pricing"
              >
                {t("printer.hero.cta")}
              </MotionButton>
              <Button
                as={Link}
                href={`/${lang}`}
                size="lg"
                fontSize="md"
                variant="outline"
                colorScheme="purple"
                rightIcon={<ChevronRightIcon />}
              >
                {t("printer.hero.back")}
              </Button>
            </Stack>
          </Box>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            maxW={{ base: "100%", md: "45%" }}
          >
            <MotionImage
              whileHover={{ scale: 1.05 }}
              src="https://images.unsplash.com/photo-1625895197185-efcec01cffe0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Thermal printer example"
              rounded="lg"
              shadow="2xl"
            />
          </MotionBox>
        </Flex>

        {/* Features Section */}
        <Box py={16}>
          <VStack spacing={4} textAlign="center" mb={10}>
            <Heading as="h2" size="2xl">
              {t("printer.features.title")}
            </Heading>
            <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} maxW="3xl">
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
            <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} maxW="3xl">
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

        {/* Pricing Section */}
        <Box py={16} id="pricing">
          <VStack spacing={4} textAlign="center" mb={16}>
            <Heading as="h2" size="2xl">
              {t("printer.pricing.title")}
            </Heading>
            <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} maxW="3xl">
              {t("printer.pricing.subtitle")}
            </Text>
          </VStack>

          <Flex
            flexWrap="wrap"
            justify="center"
            align="center"
            gap={10}
          >
            {pricingOptions.map((option, index) => (
              <PricingCard key={index} {...option} />
            ))}
          </Flex>
        </Box>

        {/* CTA Section */}
        <Box
          py={16}
          my={10}
          rounded="lg"
          bg="purple.600"
          color="white"
          textAlign="center"
          px={{ base: 4, md: 10 }}
        >
          <Heading size="xl" mb={6}>
            {t("printer.cta.title")}
          </Heading>
          <Text fontSize="lg" mb={8} maxW="2xl" mx="auto">
            {t("printer.cta.subtitle")}
          </Text>
          <MotionButton
            size="lg"
            colorScheme="white"
            variant="outline"
            _hover={{ bg: "white", color: "purple.600" }}
          >
            {t("printer.cta.button")}
          </MotionButton>
        </Box>

        {/* Footer */}
        <Box as="footer" py={10} textAlign="center">
          <Text color={useColorModeValue("gray.600", "gray.400")}>
            © {new Date().getFullYear()} Flybooth. {t("printer.footer.rights")}
          </Text>
          <Text fontSize="sm" mt={2} color={useColorModeValue("gray.500", "gray.500")}>
            {t("printer.footer.codedWithLove")}
          </Text>
        </Box>
      </Container>
    </Box>
  );
}