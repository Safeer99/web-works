"use client";

import { CanvasForm } from "@/components/forms/canvas-form";
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modals";
import { cn } from "@/lib/utils";
import { Canvas } from "@prisma/client";
import { ArrowLeftCircle } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface InfoProps {
  data: Canvas;
}

export const Info = ({ data }: InfoProps) => {
  const modal = useModal();

  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
      <Link href={`/agency/${data.agencyId}/canvas`}>
        <Button variant="canvas" className="px-2">
          {/* <Image src={} /> */}
          <ArrowLeftCircle className="h-6 w-6" />
          <span
            className={cn(
              "font-semibold text-xl ml-2 text-black",
              font.className
            )}
          >
            Canvas
          </span>
        </Button>
      </Link>
      <Separator
        className="bg-muted-foreground h-6 mx-2"
        orientation="vertical"
      />
      <Button
        variant="canvas"
        className="px-2 text-base font-normal"
        onClick={() => {
          modal.onOpen(
            <Modal title="Edit canvas details" description="">
              <CanvasForm defaultData={data} agencyId={data.agencyId} />
            </Modal>
          );
        }}
      >
        {data.title}
      </Button>
    </div>
  );
};
