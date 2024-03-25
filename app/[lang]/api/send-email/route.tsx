import { SendLink } from "@/component/react-email/emails/send-link";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email") || "";
  const flyboothId = searchParams.get("flyboothId");

  try {
    const data = await resend.emails.send({
      from: "Flybooth <hello@flybooth.app>",
      to: email,
      subject: "Voici ton lien Flybooth",
      react: SendLink({ flyboothId }),
    });

    return Response.json(data);
  } catch (error) {
    console.log(error);
    return Response.json({ error });
  }
}
