import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { AgencyForm } from "@/components/forms/agency-form";

interface Props {
  params: {
    agencyId: string;
  };
}

const SettingsPage = async ({ params }: Props) => {
  const data = await db.agency.findUnique({
    where: { id: params.agencyId },
  });

  if (!data) return redirect("/agency");

  return <AgencyForm defaultData={data} />;
};

export default SettingsPage;
