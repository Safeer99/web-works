import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { UserButton, currentUser } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/theme-toggle";

export const Navigation = async () => {
  const user = await currentUser();

  return (
    <div className="fixed top-0 inset-x-0 z-20 backdrop-blur-md p-4 flex items-center justify-between border-b-muted border-b-[1px]">
      <aside className="flex items-center gap-2 select-none">
        <Image src={"/logo.svg"} width={40} height={40} alt="logo" />
        <span className="text-lg font-bold">Web Works.</span>
      </aside>
      <nav className="hidden lg:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <ul className="flex items-center justify-center gap-8">
          <Link href={"#"}>Pricing</Link>
          <Link href={"#"}>About</Link>
          <Link href={"#"}>Documentation</Link>
          <Link href={"#"}>Features</Link>
        </ul>
      </nav>
      <aside className="flex gap-3 items-center">
        <Link
          href={"/agency"}
          className="sm:block hidden bg-primary text-white p-1.5 px-3 rounded hover:bg-primary/80"
        >
          {user ? (
            <p className="flex items-center gap-2 text-sm">
              Dashboard
              <ArrowRight size={20} />
            </p>
          ) : (
            "Get Started"
          )}
        </Link>
        <ThemeToggle />
      </aside>
    </div>
  );
};
