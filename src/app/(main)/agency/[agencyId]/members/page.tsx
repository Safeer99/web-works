import { db } from "@/lib/db";
import { DataTable } from "@/components/data-table";
import { Modal } from "@/components/modal";
import { SendInvitation } from "@/components/forms/send-invitation-form";
import { columns } from "./_components/columns";

interface Props {
  params: {
    agencyId: string;
  };
}

const MembersPage = async ({ params: { agencyId } }: Props) => {
  const members = await db.associate.findMany({
    where: {
      agencyId,
    },
    include: {
      user: true,
    },
  });

  const data = members.map((member) => {
    return {
      id: member.id,
      agencyId: member.agencyId,
      name: member.user.name,
      email: member.user.email,
      imageUrl: member.user.imageUrl,
      role: member.role,
      joined: member.createdAt,
    };
  });

  return (
    <DataTable
      agencyId={agencyId}
      columns={columns}
      data={data}
      buttonText="Invite members"
      modalChildren={
        <Modal
          title="Invite a member"
          description="Invite your team members to your agency to work together on your projects."
        >
          <SendInvitation agencyId={agencyId} />
        </Modal>
      }
    />
  );
};

export default MembersPage;
