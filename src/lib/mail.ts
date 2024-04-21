import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendInvitaionMail = async (email: string, agency: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_URL}invite?agency=${agency}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Invitation of joining an agency",
    html: `<p>Click <a href="${confirmLink}">here</a> for more information.</p>`,
  });
};