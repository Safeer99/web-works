import { AppWindow, ClipboardCheck, MonitorCheck, Users } from "lucide-react";
import { getAllTeamMembers, getStatsCardData } from "@/lib/agency-service";
import { RecentActivity } from "./_components/recent-activity";
import { StatsCard } from "./_components/stats-card";

interface Props {
  params: {
    agencyId: string;
  };
}

const AgencyIdPage = async ({ params: { agencyId } }: Props) => {
  const data = await getAllTeamMembers(agencyId);
  const statsData = await getStatsCardData(agencyId);

  return (
    <div className="flex flex-col gap-6">
      <div className="w-full pt-2 gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <StatsCard
          title="Total Members"
          value={statsData?.associates || 0}
          icon={Users}
        />
        <StatsCard
          title="Total Projects"
          value={statsData?.workspaces || 0}
          icon={AppWindow}
        />
        <StatsCard
          title="Published Projects"
          value={statsData?.published || 0}
          icon={MonitorCheck}
        />
        <StatsCard title="Total Forms" value={0} icon={ClipboardCheck} />
      </div>
      <RecentActivity data={data} />
    </div>
  );
};

export default AgencyIdPage;
