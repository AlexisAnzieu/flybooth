"use client";

import MotionButton from "@/component/motion-button";
import QrCode, { PAGES } from "@/component/qr-code";
import { InterfaceSections, createShortLink } from "@/lib/constants";
import {
  ArrowForwardIcon,
  ChatIcon,
  CheckIcon,
  CopyIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import {
  AbsoluteCenter,
  Box,
  Center,
  Container,
  Divider,
  Heading,
  Icon,
  Select,
  useClipboard,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  AiOutlinePicture,
  AiOutlineAppstore,
  AiFillPrinter,
} from "react-icons/ai";

export type PageProps = {
  params: { flyboothId: string };
};

const interfaceText = {
  [InterfaceSections.both]: "ajouter des photos et des messages.",
  [InterfaceSections.photos]: "seulement ajouter des photos.",
  [InterfaceSections.messages]: "seulement ajouter des messages.",
};
const insertShortLink = async (flyboothId: string): Promise<void> => {
  await fetch(`/api/short-link?flyboothId=${flyboothId}`, { method: "POST" });
};

const fetchShortLink = async (flyboothId: string): Promise<string | null> => {
  const res = await fetch(`/api/short-link?pin=${createShortLink(flyboothId)}`);
  return res.json();
};

const fetchInterfaceType = async (
  flyboothId: string
): Promise<InterfaceSections | null> => {
  const res = await fetch(
    `/api/settings/interfaceType?flyboothId=${flyboothId}`
  );
  return res.json();
};

const updateInterfaceType = async (
  flyboothId: string,
  interfaceType: InterfaceSections
): Promise<void> => {
  await fetch(
    `/api/settings/interfaceType?flyboothId=${flyboothId}&value=${interfaceType}`,
    { method: "POST" }
  );
};

export default function Index({ params: { flyboothId } }: Readonly<PageProps>) {
  const [interfaceType, setInterfaceType] = useState<InterfaceSections>(
    InterfaceSections.both
  );

  const { onCopy, hasCopied, setValue } = useClipboard("");
  const qrCodeRef = useRef(null);
  const [hasCopiedLink, setHasCopiedLink] = useState(false);

  useEffect(() => {
    const initFlybooth = async () => {
      const shortLink = await fetchShortLink(flyboothId);
      if (shortLink) {
        setHasCopiedLink(true);
        const interfaceType = await fetchInterfaceType(flyboothId);
        if (interfaceType) {
          setInterfaceType(interfaceType);
        }
      }
    };
    initFlybooth();
  }, [flyboothId]);

  useEffect(() => {
    setValue(
      `${window.location.protocol}//${window.location.host}/${flyboothId}`
    );
  }, [setValue, flyboothId]);

  const printQRCode = () => {
    const qrCodeElement = qrCodeRef.current;
    if (qrCodeElement) {
      const printWindow = window.open("", "_blank");
      printWindow?.document.write((qrCodeElement as HTMLElement).outerHTML);
      printWindow?.document.close();
      printWindow?.print();
    } else {
      console.error("QR Code element not found");
    }
  };

  const copyURL = async () => {
    onCopy();
    setHasCopiedLink(true);
    await insertShortLink(flyboothId);
  };

  const handleInterfaceTypeChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newInterfaceType = event.target.value as keyof typeof interfaceText;
    setInterfaceType(newInterfaceType);
    await updateInterfaceType(flyboothId, newInterfaceType);
  };

  return (
    <Box bgColor={"purple"} minH={"100vh"}>
      <Container maxW="3xl" textAlign={"center"} color={"white"} pt={10}>
        <Heading size={"xl"}>{"  Bienvenue dans ton flybooth !"}</Heading>
        <Box className="step" borderRadius={20} pb="10" boxShadow={"2xl"}>
          <Box position="relative" padding="10">
            <Divider />
            <AbsoluteCenter
              fontWeight={"500"}
              fontSize={30}
              borderRadius={30}
              color={"purple"}
              bg="white"
              px="4"
            >
              1
            </AbsoluteCenter>
          </Box>

          <Heading size={"md"} px={3} pb={7}>
            {
              "Garde précieusement l'URL de cette page. C'est ici que tu retrouveras l'accès à ta galerie et au mur des messages."
            }
          </Heading>

          <MotionButton
            rightIcon={hasCopied ? <CheckIcon /> : <CopyIcon />}
            colorScheme={hasCopied ? "purple" : "gray"}
            size={"lg"}
            onClick={copyURL}
          >
            {!hasCopied
              ? "Copier l'URL de la page"
              : "URL copié dans le presse-papier"}
          </MotionButton>
        </Box>

        {hasCopiedLink && (
          <>
            <Box pb="10">
              <Box position="relative" padding="10">
                <Divider />
                <AbsoluteCenter
                  fontWeight={"500"}
                  fontSize={30}
                  borderRadius={30}
                  color={"purple"}
                  bg="white"
                  px="3"
                >
                  2
                </AbsoluteCenter>
              </Box>

              <Heading size={"md"}>
                {`Accède maintenant à l'interface que tu vas partager avec tes invités afin qu'ils puissent ${interfaceText[interfaceType]}`}
              </Heading>

              <Center>
                <Box width={"60%"} p={5}>
                  <Select
                    value={interfaceType}
                    size="lg"
                    onChange={handleInterfaceTypeChange}
                    display={"flex"}
                    variant="outline"
                  >
                    <option
                      style={{ color: "black" }}
                      value={InterfaceSections.both}
                    >
                      Photos et messages
                    </option>
                    <option
                      style={{ color: "black" }}
                      value={InterfaceSections.photos}
                    >
                      Photos
                    </option>
                    <option
                      style={{ color: "black" }}
                      value={InterfaceSections.messages}
                    >
                      Messages
                    </option>
                  </Select>
                </Box>
              </Center>
              <Link target="_blank" href={`${flyboothId}/upload`}>
                <MotionButton rightIcon={<ArrowForwardIcon />} size={"lg"}>
                  {"Accéder à l'interface"}
                </MotionButton>
              </Link>

              <Heading size={"md"} py={10}>
                {
                  "Tu peux aussi imprimer le QR code ci-dessous et le coller à des endroits stratégiques pour faciliter l'accès à l'interface."
                }
              </Heading>

              <Box>
                <Box ref={qrCodeRef}>
                  <Center>
                    <QrCode redirectTo={PAGES.upload} flyboothId={flyboothId} />
                  </Center>
                </Box>
                <MotionButton
                  rightIcon={<Icon as={AiFillPrinter} />}
                  mt={5}
                  onClick={() => printQRCode()}
                  size={"lg"}
                >
                  Imprimer
                </MotionButton>
              </Box>
            </Box>

            <Box pb="10">
              <Box position="relative" padding="10">
                <Divider />
                <AbsoluteCenter
                  fontWeight={"500"}
                  fontSize={30}
                  borderRadius={30}
                  color={"purple"}
                  bg="white"
                  px="3"
                >
                  3
                </AbsoluteCenter>
              </Box>

              <Heading size={"md"} pb={7}>
                {
                  "Voici ensuite le contenu qui s'actualise automatiquement, à projeter lors de ton événement."
                }
              </Heading>

              <Box display={"flex"} justifyContent={"space-evenly"}>
                {interfaceType !== InterfaceSections.messages && (
                  <Box pb={4}>
                    <Link target="_blank" href={`${flyboothId}/coverflow`}>
                      <MotionButton
                        rightIcon={<Icon as={AiOutlinePicture} />}
                        size={"lg"}
                      >
                        Photos
                      </MotionButton>
                    </Link>
                  </Box>
                )}

                {interfaceType !== InterfaceSections.photos && (
                  <Box>
                    <Link target="_blank" href={`${flyboothId}/message`}>
                      <MotionButton rightIcon={<ChatIcon />} size={"lg"}>
                        Messages
                      </MotionButton>
                    </Link>
                  </Box>
                )}
              </Box>

              {interfaceType !== InterfaceSections.messages && (
                <>
                  <Heading size={"md"} pt={10}>
                    Code de projection des photos
                  </Heading>

                  <Box fontSize={60} fontWeight={"600"}>
                    {createShortLink(flyboothId)}
                  </Box>
                </>
              )}
            </Box>

            <Box pb="10">
              <Box position="relative" padding="10">
                <Divider />
                <AbsoluteCenter
                  fontWeight={"500"}
                  fontSize={30}
                  borderRadius={30}
                  color={"purple"}
                  bg="white"
                  px="3"
                >
                  4
                </AbsoluteCenter>
              </Box>

              <Heading size={"md"} pb={7}>
                {
                  "Enfin, voici une galerie que tu peux partager avec tes invités après l'événement afin de leur permettre de télécharger les photos qu'ils ont le plus appréciées. Attention, les photos sont supprimées du serveur au bout d'une semaine !"
                }
              </Heading>

              <Box pb={4}>
                <Link target="_blank" href={`${flyboothId}/gallery`}>
                  <MotionButton
                    rightIcon={<Icon as={AiOutlineAppstore} />}
                    size={"lg"}
                  >
                    Galerie
                  </MotionButton>
                </Link>
              </Box>
            </Box>

            <Box pb="10">
              <Box position="relative" padding="10">
                <Divider />
                <AbsoluteCenter
                  fontWeight={"500"}
                  fontSize={30}
                  borderRadius={30}
                  color={"purple"}
                  bg="white"
                  px="3"
                >
                  5
                </AbsoluteCenter>
              </Box>

              <Heading size={"md"} pb={7}>
                {
                  "Et pour finir, réinitialise cette page pour ton prochain événement."
                }
              </Heading>
              <Link href={"/"}>
                <MotionButton rightIcon={<RepeatIcon />} size={"lg"}>
                  Réinitialiser
                </MotionButton>
              </Link>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
}
