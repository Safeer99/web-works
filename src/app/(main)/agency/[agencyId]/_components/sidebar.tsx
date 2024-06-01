import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

import { AgencySwitcher } from "./agency-switcher";
import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = async () => {
  const user = await getSelf();

  const data = await db.associate.findMany({
    where: { userId: user.id },
    include: { agency: true },
  });

  return (
    <div className="scrollbar-hidden h-full bg-background border-r flex flex-col shadow-sm">
      <AgencySwitcher data={data} />
      <SidebarRoutes />
    </div>
  );
};
