import { redirect } from "next/navigation";
import { getInvitationByToken } from "@/lib/invitation";
import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { InvitaionDialog } from "./_components/dialog";

interface Props {
  searchParams: {
    token: string;
  };
}

const InvitationPage = async ({ searchParams }: Props) => {
  const self = await getSelf();

  const invitation = await getInvitationByToken(searchParams.token);

  if (!invitation) return redirect("/agency");

  const alreadyInAgency = await db.associate.findUnique({
    where: {
      agencyId_userId: {
        agencyId: invitation.agencyId,
        userId: self.id,
      },
    },
  });

  if (alreadyInAgency) return redirect(`/agency/${alreadyInAgency.agencyId}`);

  return <InvitaionDialog invitation={invitation} />;
};

export default InvitationPage;
