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
        "group flex items-center gap-x-2 text-muted-foreground text-sm font-[500] pl-6 hover:text-white hover:bg-primary/90 transition-all",
        isActive && "text-white bg-primary hover:text-white hover:bg-primary/90"
      )}
    >
      <div className="flex items-center gap-x-4 py-4">
        <Icon
          size={22}
          className={cn(
            "text-muted-foreground group-hover:text-white transition-all",
            isActive && "text-white group-hover:text-white"
          )}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-primary-foreground h-full transition-all",
          isActive && "opacity-100"
        )}
      />
    </button>
  );
};
