import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";
import { AgencyForm } from "@/components/forms/agency-form";

const AgencyPage = async () => {
  const user = await getSelf();

  const agency = await db.agency.findFirst({
    where: {
      associates: {
        some: {
          userId: user.id,
        },
      },
    },
  });

  if (agency) {
    return redirect(`/agency/${agency.id}`);
  }

  return (
    <div className="flex justify-center items-center mt-4">
      <div className="max-w-[850px] border-[1px] p-4 rounded-xl">
        <h1 className="text-4xl mb-4">Create an Agency</h1>
        <AgencyForm />
      </div>
    </div>
  );
};

export default AgencyPage;
