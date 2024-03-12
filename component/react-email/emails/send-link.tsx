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

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://flybooth.app";

export const SendLink = ({ flyboothId }: any) => (
  <Html>
    <Head />
    <Preview>Voici le lien vers ton flybooth, garde le précieusement !</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={paragraph}>{"Merci d'avoir créé ton Flybooth !"}</Text>
        <Text style={paragraph}>
          {" Voici un lien qui te permettra d'y accéder en tout temps."}
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href={`${baseUrl}/${flyboothId}`}>
            Accéder à ton Flybooth
          </Button>
        </Section>
        <Text style={paragraph}>
          À très bientôt!
          <br />
        </Text>
        <Hr style={hr} />
        <Text style={footer}>{"Codé avec <3 à Montréal"}</Text>
      </Container>
    </Body>
  </Html>
);

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

const logo = {
  margin: "0 auto",
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
