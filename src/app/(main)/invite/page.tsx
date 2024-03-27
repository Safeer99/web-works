import { getInvitationByIdAndEmail } from "@/lib/invitation";
import { redirect } from "next/navigation";
import { InvitaionDialog } from "./_components/dialog";
import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";

interface Props {
  searchParams: {
    agency: string;
  };
}

const InvitationPage = async ({ searchParams }: Props) => {
  const self = await getSelf();

  const invitation = await getInvitationByIdAndEmail({
    agencyId: searchParams.agency,
    email: self.email,
  });

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
