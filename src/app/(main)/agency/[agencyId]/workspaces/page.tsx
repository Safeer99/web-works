import { db } from "@/lib/db";
import { WorkspaceForm } from "@/components/forms/workspace-form";
import { DataTable } from "@/components/data-table";
import { Modal } from "@/components/modal";
import { columns } from "./_components/columns";

interface Props {
  params: {
    agencyId: string;
  };
}

const WorkspacesPage = async ({ params }: Props) => {
  const data = await db.workspace.findMany({
    where: { agencyId: params.agencyId },
  });

  return (
    <DataTable
      agencyId={params.agencyId}
      columns={columns}
      data={data}
      buttonText="Create Workspace"
      modalChildren={
        <Modal
          title="Create A Workspace"
          description="Workspaces are a like websites, but better! Try creating one!"
        >
          <WorkspaceForm agencyId={params.agencyId} />
        </Modal>
      }
    />
  );
};

export default WorkspacesPage;
