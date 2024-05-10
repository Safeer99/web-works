import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs";
import clsx from "clsx";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const user = await currentUser();

  return (
    <div className="pb-36 px-2">
      <section className="h-full w-full pt-36 relative flex items-center justify-center flex-col">
        <div className="absolute bottom-0 left-0 right-0 top-0 z-[-1] bg-[linear-gradient(to_right,#6b6b6b2c_1px,transparent_1px),linear-gradient(to_bottom,#6b6b6b2c_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
          <h1 className="text-8xl font-bold text-center md:text-[150px]">
            Web Works
          </h1>
        </div>
        <p className="text-center md:text-lg pb-4">
          Develop with the force of code — without typing a single line.
        </p>
        <Link
          href={"/agency"}
          className="bg-primary text-white p-1.5 px-3 rounded hover:bg-primary/80"
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
        <div className="flex justify-center items-center relative mt-16">
          <Image
            src={"/preview.png"}
            alt="banner image"
            height={900}
            width={900}
            className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted"
          />
          <div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10" />
        </div>
      </section>

      <section className="flex justify-center items-center flex-col gap-4 mt-40">
        <h2 className="text-4xl md:text-6xl text-center font-semibold">
          Unleash creative potential beyond conventional templates.
        </h2>
        <p className="text-muted-foreground text-center md:text-lg">
          You visualize, we materialize the code — for bespoke layouts and
          <br />
          intricate animations alike.
        </p>

        <div className="flex justify-center items-center relative mt-16">
          <Image
            src={"/preview.png"}
            alt="banner image"
            height={900}
            width={900}
            className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted"
          />
          <div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10" />
        </div>
      </section>

      <section className="w-full flex justify-center items-center flex-col gap-4 mt-40">
        <div className="w-full flex items-end flex-wrap justify-between gap-10 md:px-28">
          <h2 className="text-6xl md:text-8xl font-semibold">
            Get started <br /> for free.
          </h2>
          <div className="flex flex-col gap-5">
            <p className="text-muted-foreground text-sm md:text-base max-w-[400px]">
              Try Web-Works for as long as you like with our free Starter plan.
              Purchase a paid Site plan to unlock additional features.
            </p>
            <Link
              href={"/agency"}
              className="bg-primary text-white p-1.5 px-3 rounded hover:bg-primary/80 self-start"
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
          </div>
        </div>
      </section>
    </div>
  );
}
