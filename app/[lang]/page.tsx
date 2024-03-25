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
import { FaGithub, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import { QuestionIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";

const MotionIcon = motion(QuestionIcon);

export default function Index() {
  const { t } = useTranslation("main");
  const g = t("landing.faq.questions");
  console.log(g);

  const router = useRouter();
  const toast = useToast();
  const [isInvalid, setIsInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleGenerate = () => {
    setIsLoading(true);
    const uuid = uuidv4();
    router.push(uuid);
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
      router.push(`/${flyboothId}/coverflow`);
    }
  };

  return (
    <Box bgColor={"purple"} color={"white"}>
      <Container
        display={"flex"}
        flexDirection={"column"}
        maxW="3xl"
        textAlign={"center"}
        pt={5}
        minH={"100vh"}
      >
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
        <Box flexGrow={1} minH={35}></Box>

        <Box
          as={"footer"}
          display={"flex"}
          justifyContent={"space-evenly"}
          pb={5}
        >
          <Box fontWeight={"600"} textDecoration={"underline"}>
            <Link target="_blank" href="https://flybooth.canny.io/new-features">
              {t("landing.footer.featureAsk")}
            </Link>
          </Box>
        </Box>

        <Box
          as={"footer"}
          display={"flex"}
          justifyContent={"space-evenly"}
          pb={5}
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
                    <AccordionItem key={index}>
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
