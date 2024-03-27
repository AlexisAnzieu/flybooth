import { defaultLocale } from "@/i18n";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

const BASE_URL = "https://flybooth.app";

const defaultTranslations = {
  preview: "Here is the link to your Flybooth, keep it safe!",
  title: "Thank you for creating your Flybooth!",
  subtitle: "Here is a link that will allow you to access it at any time.",
  buttonLabel: "Access the Flybooth",
  ending: "See you soon!",
  footer: "Coded with ❤ in Montreal",
};

export const SendLink = ({
  flyboothId = "flyboothId",
  lang = defaultLocale,
  translations = defaultTranslations,
}: {
  flyboothId: string;
  lang: string;
  translations: typeof defaultTranslations;
}) => {
  return (
    <Html lang={lang}>
      <Head />
      <Preview>{translations.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={paragraph}>{translations.title}</Text>
          <Text style={paragraph}>{translations.subtitle}</Text>
          <Section style={btnContainer}>
            <Button style={button} href={`${BASE_URL}/${lang}/${flyboothId}`}>
              {translations.buttonLabel}
            </Button>
          </Section>
          <Text style={paragraph}>
            {translations.ending}
            <br />
          </Text>
          <Hr style={hr} />
          <Text style={footer}>{translations.footer}</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default SendLink;

const main = {
  textAlign: "center" as const,
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#801380",
  borderRadius: "17px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
