"use server";

import crypto from "crypto";
import { Role } from "@prisma/client";
import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";
import { sendInvitaionMail } from "@/lib/mail";

export const getInvitationByToken = async (token: string) => {
  const existingInvitation = await db.invitation.findUnique({
    where: { token },
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
  const existingInvitation = await db.invitation.findUnique({
    where: {
      agencyId_email: {
        agencyId,
        email,
      },
    },
  });

  if (existingInvitation) {
    await db.invitation.delete({
      where: {
        id: existingInvitation.id,
      },
    });
  }

  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const token = crypto.randomInt(100000, 1000000).toString();

  const res = await db.invitation.create({
    data: { token, email, agencyId, role, expires },
  });

  await sendInvitaionMail(email, token);

  return res;
};

export const acceptInvitation = async (token: string) => {
  const self = await getSelf();
  const invitation = await getInvitationByToken(token);

  if (!invitation) throw new Error(`Invitation not found`);
  if (invitation.email !== self.email)
    throw new Error("Unauthorized access!!!");

  const createAccount = await db.associate.create({
    data: {
      userId: self.id,
      agencyId: invitation.agencyId,
      role: invitation.role,
    },
  });

  await db.invitation.delete({ where: { id: invitation.id } });

  return createAccount;
};

export const rejectInvitation = async (token: string) => {
  const self = await getSelf();
  const invitation = await getInvitationByToken(token);

  if (!invitation) throw new Error(`Invitation not found`);
  if (invitation.email !== self.email)
    throw new Error("Unauthorized access!!!");

  return await db.invitation.delete({
    where: {
      token,
    },
  });
};
