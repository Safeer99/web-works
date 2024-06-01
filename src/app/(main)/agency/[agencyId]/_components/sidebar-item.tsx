"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const SidebarItem = ({ href, icon: Icon, label }: SidebarItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const isActive =
    (pathname?.endsWith(`${params?.agencyId}`) && href === "/") ||
    (pathname?.includes(href) && href !== "/");

  const onClick = () => {
    router.push(`/agency/${params?.agencyId}/${href}`);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "group rounded-md hover:bg-muted transition-all text-muted-foreground",
        isActive &&
          "text-white bg-primary hover:text-white hover:bg-primary/90 translate-x-4 transition-all shadow-md shadow-primary/30"
      )}
    >
      <div className="flex items-center gap-x-4 p-2 px-4  text-sm font-[500]">
        <Icon
          size={22}
          className={cn(
            "text-muted-foreground transition-all",
            isActive && "text-white group-hover:text-white"
          )}
        />
        {label}
      </div>
    </button>
  );
};
