"use server";

import { Role } from "@prisma/client";
import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";
import { Resend } from "resend";
import { redirect } from "next/navigation";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendInvitaionMail = async (email: string, agency: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_URL}invite?agency=${agency}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Invitation of joining an agency",
    html: `<p>Click <a href="${confirmLink}">here</a> for more information.</p>`,
  });
};

export const getInvitationByIdAndEmail = async ({
  agencyId,
  email,
}: {
  agencyId: string;
  email: string;
}) => {
  const existingInvitation = await db.invitation.findUnique({
    where: {
      agencyId,
      email,
    },
    include: {
      agency: true,
    },
  });

  return existingInvitation;
};

export const sendInvitation = async (
  role: Role,
  email: string,
  agencyId: string
) => {
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingInvitation = await getInvitationByIdAndEmail({
    agencyId,
    email,
  });

  if (existingInvitation) {
    await db.invitation.delete({
      where: {
        id: existingInvitation.id,
      },
    });
  }

  const res = await db.invitation.create({
    data: { email, agencyId, role, expires },
  });

  sendInvitaionMail(email, res.agencyId);

  return res;
};

export const acceptInvitation = async (id: string) => {
  const self = await getSelf();
  const invitation = await getInvitationByIdAndEmail({
    agencyId: id,
    email: self.email,
  });

  if (!invitation) throw Error(`Invitation not found`);
  const createAccount = await db.associate.create({
    data: {
      userId: self.id,
      agencyId: invitation.agencyId,
      role: invitation.role,
    },
  });

  await db.invitation.delete({ where: { id: invitation.id } });

  return redirect(`/agency/${createAccount.agencyId}`);
};

export const rejectInvitation = async (id: string) => {
  const data = await db.invitation.delete({
    where: {
      id,
    },
  });
  return redirect("/agency");
};
