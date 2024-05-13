import { redirect } from "next/navigation";
import { Role } from "@prisma/client";
import { db } from "@/lib/db";
import { getAssociatedAccount } from "@/lib/auth-service";
import { AgencyForm } from "@/components/forms/agency-form";

interface Props {
  params: {
    agencyId: string;
  };
}

const SettingsPage = async ({ params }: Props) => {
  const account = await getAssociatedAccount(params.agencyId);

  const data = await db.agency.findUnique({
    where: { id: params.agencyId },
  });

  if (!data) return redirect("/agency");

  return (
    <AgencyForm
      defaultData={data}
      isOwner={account.role === Role.AGENCY_OWNER}
      isAdmin={account.role === Role.AGENCY_ADMIN}
    />
  );
};

export default SettingsPage;
