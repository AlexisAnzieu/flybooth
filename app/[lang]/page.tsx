"use client";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  PinInput,
  PinInputField,
  useToast,
  Icon,
  useDisclosure,
  Modal,
  ModalBody,
  Heading,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { ReactSVG } from "react-svg";
import { logoFont } from "../font";
import { useState } from "react";
import MotionButton from "@/component/motion-button";
import { FaGithub, FaEnvelope, FaPrint } from "react-icons/fa";
import Link from "next/link";
import { QuestionIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";
import LanguageSwitcher from "@/component/language-switcher";

const MotionIcon = motion(QuestionIcon);

export default function Index() {
  const { t, lang } = useTranslation("main");
  const router = useRouter();
  const toast = useToast();
  const [isInvalid, setIsInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleGenerate = () => {
    setIsLoading(true);
    const uuid = uuidv4();
    router.push(`${lang}/${uuid}`);
  };

  const handleComplete = async (pin: string) => {
    const res = await fetch(`/api/short-link?pin=${pin.toLowerCase()}`);
    const flyboothId = await res.json();

    if (!flyboothId) {
      setIsInvalid(true);
      toast({
        title: t("landing.projectionCode.toast.title"),
        description: t("landing.projectionCode.toast.description"),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      router.push(`${lang}/${flyboothId}/coverflow`);
    }
  };

  return (
    <Box bgColor={"purple"} color={"white"} display="flex" flexDirection="column" minH="100vh">
      {/* Printer Banner - Positioned at the top of the page */}
      <Box
        as={Link}
        href={`/${lang}/printer`}
        py={{ base: 4, md: 3 }}
        bg="rgba(0, 0, 0, 0.2)"
        color="white"
        cursor="pointer"
        transition="all 0.3s"
        _hover={{ bg: "rgba(0, 0, 0, 0.3)" }}
        textDecoration="none"
        display="block"
        width="100%"
      >
        <Container
          maxW="3xl"
          display="flex"
          flexDirection={{ base: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          gap={{ base: 2, sm: 0 }}
        >
          <Box display="flex" alignItems="center" mb={{ base: 2, sm: 0 }}>
            <Icon as={FaPrint} mr={3} fontSize={{ base: "md", md: "lg" }} />
            {t("landing.printer.bannerText")}
          </Box>
          <Box
            px={4}
            py={1}
            borderRadius="md"
            bg="white"
            color="purple"
            fontWeight="bold"
            transition="all 0.2s"
            _hover={{ 
              bg: "gray.100", 
              transform: "scale(1.05)",
              boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.3)"
            }}
            minWidth={{ base: "120px", md: "auto" }}
            textAlign="center"
          >
            {t("landing.printer.buttonText")}
          </Box>
        </Container>
      </Box>

      <Container
        display={"flex"}
        flexDirection={"column"}
        maxW="3xl"
        textAlign={"center"}
        flexGrow={1}
        py={4}
      >
        <Box as="header" w="100%" color="black" textAlign={"right"}>
          <LanguageSwitcher currentLang={lang} />
        </Box>
        <Box
          className={logoFont.className}
          display={"flex"}
          justifyContent={"center"}
          gap={5}
          fontSize={60}
        >
          <ReactSVG
            beforeInjection={(svg) => {
              svg.setAttribute("style", "width: 80px");
            }}
            src="/logo.svg"
          />
          Flybooth
        </Box>
        <Box className={logoFont.className} pb={50} fontSize={25}>
          - {t("landing.subtitle")} -
        </Box>

        <Box pb={10}>
          <MotionButton
            loadingText={t("landing.cta.loading")}
            isLoading={isLoading}
            boxShadow={"dark-lg"}
            onClick={handleGenerate}
            size={"lg"}
          >
            {t("landing.cta.label")}
          </MotionButton>
        </Box>

        <Box fontWeight={"600"} fontSize={20}>
          {t("landing.projectionCode.label")}
        </Box>
        <Box>
          <PinInput
            variant={"flushed"}
            type="alphanumeric"
            size="lg"
            onComplete={handleComplete}
            isInvalid={isInvalid}
          >
            <PinInputField mr={2} />
            <PinInputField mr={2} />
            <PinInputField mr={2} />
            <PinInputField mr={2} />
          </PinInput>
        </Box>

        <Box pt={20}>
          <MotionIcon
            fontSize={50}
            cursor={"pointer"}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "linear", duration: 0.2 }}
            borderRadius={25}
            boxShadow="dark-lg"
            onClick={onOpen}
          />
        </Box>
        
        <Box flexGrow={1} minH={10}></Box>
        
        {/* Footer section with border separation */}
        <Box 
          as="footer" 
          mt={4} 
          mb={4}
          borderTopWidth="1px"
          borderTopColor="rgba(255, 255, 255, 0.1)"
          pt={4}
        >
          <Box
            display={"flex"}
            justifyContent={"space-evenly"}
            pb={4}
          >
            <Box fontWeight={"600"} textDecoration={"underline"}>
              <Link target="_blank" href="https://flybooth.canny.io/new-features">
                {t("landing.footer.featureAsk")}
              </Link>
            </Box>
          </Box>

          <Box
            display={"flex"}
            justifyContent={"space-evenly"}
            pb={4}
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
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent p={2}>
            <ModalBody>
              <Heading textAlign={"center"} as="h2" size="md" mb={4}>
                {t("landing.faq.title")}
              </Heading>
              <Accordion>
                {Array(5)
                  .fill(null)
                  .map((_, index) => (
                    <AccordionItem key={`faq-${index}`}>
                      <h2>
                        <AccordionButton>
                          <Box as="span" flex="1">
                            {t(`landing.faq.questions.q${index}`)}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        {t(`landing.faq.questions.a${index}`)}
                      </AccordionPanel>
                    </AccordionItem>
                  ))}
              </Accordion>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
    </Box>
  );
}
