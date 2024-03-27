import { Sidebar } from "./_components/sidebar";
import { Navbar } from "./_components/navbar";
import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface Props {
  children: React.ReactNode;
  params: {
    agencyId: string;
  };
}

const AgencyIdLayout = async ({ children, params }: Props) => {
  const self = await getSelf();

  const agency = await db.agency.findUnique({
    where: {
      id: params.agencyId,
      associates: {
        some: {
          userId: self.id,
        },
      },
    },
  });

  if (!agency) notFound();

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-64 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-64 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-64 pt-[80px] h-full">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default AgencyIdLayout;
