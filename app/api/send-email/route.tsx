import { SendLink } from "@/component/react-email/emails/send-link";
import i18n from "@/i18n";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const flyboothId = searchParams.get("flyboothId");
  const lang = searchParams.get("lang");

  if (!email || !flyboothId || !lang || !i18n.locales.includes(lang)) {
    return Response.json({ error: "Wrong parameters" }, { status: 400 });
  }

  const {
    email: { sendLink: translations },
  } = await i18n.loadLocaleFrom(lang);

  try {
    const data = await resend.emails.send({
      from: "Flybooth <hello@flybooth.app>",
      to: email,
      subject: translations.subject,
      react: SendLink({ flyboothId, lang, translations }),
    });

    return Response.json(data);
  } catch (error) {
    console.log(error);
    return Response.json({ error });
  }
}
