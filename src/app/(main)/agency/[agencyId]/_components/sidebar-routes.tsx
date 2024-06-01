"use client";

import {
  AppWindow,
  Brush,
  Database,
  LayoutDashboard,
  PanelsTopLeft,
  Settings,
  Users,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";

const routes = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: AppWindow,
    label: "Workspaces",
    href: "/workspaces",
  },
  {
    icon: Brush,
    label: "Canvas",
    href: "/canvas",
  },
  {
    icon: PanelsTopLeft,
    label: "Kanban",
    href: "/kanban",
  },
  {
    icon: Users,
    label: "Members",
    href: "/members",
  },
  {
    icon: Database,
    label: "Media",
    href: "/media",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
  },
];

export const SidebarRoutes = () => {
  return (
    <div className="relative flex flex-col gap-3 px-2 w-full pb-10">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
