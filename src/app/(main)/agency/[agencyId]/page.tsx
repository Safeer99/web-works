import { redirect } from "next/navigation";

interface Props {
  params: {
    agencyId: string;
  };
}

const AgencyIdPage = async ({ params: { agencyId } }: Props) => {
  return redirect(`/agency/${agencyId}/workspaces`);
};

export default AgencyIdPage;
