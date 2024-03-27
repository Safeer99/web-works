import { Menu } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sidebar } from "./sidebar";

export const Navbar = () => {
  return (
    <div className="p-4 border-b h-full bg-background flex items-center justify-between shadow-sm">
      <Sheet>
        <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>
      <div className="ml-auto flex items-center gap-4">
        <UserButton afterSignOutUrl="/" />
        <ThemeToggle />
      </div>
    </div>
  );
};
