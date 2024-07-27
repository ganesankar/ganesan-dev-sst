import { NextResponse } from "next/server";
import { Resend } from "resend";
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(req, res) {
  try {
    const data = await req.json();
    const { email, message } = data;
    if (email != "" && message !== "") {
      const result = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: ["ganesan.intech@gmail.com", email],
        subject: "GANESAN DEV :: MESSAGE FROM " + email,
        html: `<p><b>From : ${email}</b></p><p><b>Message : ${message}</b></p>`,
      });
      if (result?.error) {
        return NextResponse.json(result?.error?.message, {
          status: 400,
        });
      }
      return NextResponse.json(result);
    }
  } catch (error) {
    return NextResponse.json(error, {
      status: 400,
    });
  }
}
