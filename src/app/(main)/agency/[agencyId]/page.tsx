import { AppWindow, MailIcon, MonitorCheck, Users } from "lucide-react";
import { getAllTeamMembers, getStatsCardData } from "@/lib/agency-service";
import { getAllInvitations } from "@/lib/invitation";
import { getAssociatedAccount } from "@/lib/auth-service";
import { StatsCard } from "./_components/stats-card";
import { RecentActivity } from "./_components/recent-activity";
import { InvitationsStatus } from "./_components/invitations-status";

interface Props {
  params: {
    agencyId: string;
  };
}

const AgencyIdPage = async ({ params: { agencyId } }: Props) => {
  const data = await getAllTeamMembers(agencyId);
  const invitationData = await getAllInvitations(agencyId);
  const statsData = await getStatsCardData(agencyId);
  const currentUser = await getAssociatedAccount(agencyId);

  return (
    <div className="flex flex-col gap-6">
      <div className="w-full pt-2 gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <StatsCard
          title="Total Members"
          value={`${statsData?.associates || 0}`}
          icon={Users}
        />
        <StatsCard
          title="Total Projects"
          value={`${statsData?.workspaces || 0}`}
          icon={AppWindow}
        />
        <StatsCard
          title="Published Projects"
          value={`${statsData?.published || 0}`}
          icon={MonitorCheck}
        />
        <StatsCard
          title="Pending Invitations"
          value={`${statsData?.pendingInvitations || 0}`}
          icon={MailIcon}
        />
      </div>
      <div className="grid grid-cols-1 gap-6">
        <RecentActivity data={data} />
        <InvitationsStatus
          data={invitationData}
          isAdmin={currentUser.role !== "AGENCY_USER"}
        />
      </div>
    </div>
  );
};

export default AgencyIdPage;
