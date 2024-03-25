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
import { FaGithub, FaEnvelope, FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import { QuestionIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";

const MotionIcon = motion(QuestionIcon);

export default function Index() {
  const { t } = useTranslation("main");

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
        title: "Non trouvé",
        description: "Le code de projection n'est associé à aucun flybooth.",
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
          {t("title")}
        </Box>
        <Box className={logoFont.className} pb={50} fontSize={25}>
          - Photobooth on fly, from small gatherings to big venues -
        </Box>

        <Box pb={10}>
          <MotionButton
            loadingText="Création en cours..."
            isLoading={isLoading}
            boxShadow={"dark-lg"}
            onClick={handleGenerate}
            size={"lg"}
          >
            Crée ton photobooth
          </MotionButton>
        </Box>

        <Box fontWeight={"600"} fontSize={20}>
          {"ou entre le code de projection"}
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
              Clique ici afin de suggérer de nouvelles fonctionnalités
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
            Codé avec <Icon as={FaRegHeart} /> à Montréal
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
                Foire Aux Questions
              </Heading>
              <Accordion>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1">
                        Est-ce gratuit?
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    {`Oui, aucun frais ou compte n'est requis pour utiliser Flybooth. En outre le code source est intégralement disponible sans restriction de copyright.`}
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1">
                        Comment ça marche ?
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    {`Dédié au organisateurs d'événements, Flybooth est un photobooth
                en ligne qui permet aux participants de prendre des photos ou
                d'envoyer des messages à partir de leur smartphone. Les photos
                et messages peuvent ensuite être projeté en temps réel sur le
                matériel mis en place par l'organisateur.`}
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1">
                        Est-il possible de modérer les photos ?
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    {
                      "Afin de limiter l'activité manuel de l'organisateur au cours de l'événement, les photos inappropriées sont automatiquement supprimées. Il est important de préciser que l'algorithme n'est cependant pas infaillible."
                    }
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1">
                        Combien de temps les photos sont-elles conservées ?
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    {
                      "Les photos sont conservées 7 jours durant lesquels les participants peuvent les revisionner ou les télécharger à partir d'une galerie dédiée."
                    }
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1">
                        Combien de photos les participants peuvent-ils poster ?
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    {
                      "Les participants peuvent poster jusqu'à 1000 photos par événement. Cette limite peut-être augmentée par palier de 10$/1000 photos additionnelles. Plus d'information par courriel."
                    }
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
    </Box>
  );
}
