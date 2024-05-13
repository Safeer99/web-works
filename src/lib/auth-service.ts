"use server";

import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { db } from "@/lib/db";

export const getSelf = async () => {
  const self = await currentUser();

  if (!self) {
    return redirect("/sign-in");
  }

  const user = await db.user.findUnique({
    where: { externalUserId: self.id },
  });

  if (!user) {
    throw new Error("User Not found");
  }

  return user;
};

export const getAssociatedAccount = async (agencyId: string) => {
  const self = await getSelf();
  const account = await db.associate.findUnique({
    where: {
      agencyId_userId: {
        agencyId,
        userId: self.id,
      },
    },
    include: {
      user: true,
    },
  });

  if (!account) {
    throw new Error("Unauthorized access.");
  }

  return account;
};
