import { Loader } from "lucide-react";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { Room } from "@/components/room";
import { Canvas } from "./_components/canvas";

interface Props {
  params: {
    agencyId: string;
    canvasId: string;
  };
}

const Loading = () => {
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center">
      <Loader className="h-6 w-6 text-muted-foreground animate-spin" />
    </main>
  );
};

const CanvasIdPage = async ({ params }: Props) => {
  //TODO: check board authorization
  const data = await db.canvas.findUnique({
    where: {
      id: params.canvasId,
      agencyId: params.agencyId,
    },
  });

  if (!data) redirect(`/agency/${params.agencyId}/canvas`);

  return (
    <div className="fixed w-full top-0 bottom-0 left-0 right-0 z-[100] bg-background">
      <Room roomId={params.canvasId} fallback={<Loading />}>
        <Canvas data={data} />
      </Room>
    </div>
  );
};

export default CanvasIdPage;
