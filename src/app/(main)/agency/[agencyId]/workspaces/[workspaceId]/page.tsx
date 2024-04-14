import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WorkspaceForm } from "@/components/forms/workspace-form";
import { getWorkspace } from "@/lib/workspace-service";
import { WorkspaceSteps } from "./_components/workspace-steps";
import { Actions } from "./_components/actions";

interface Props {
  params: {
    agencyId: string;
    workspaceId: string;
  };
}

const WorkspaceIdPage = async ({ params }: Props) => {
  const workspacePages = await getWorkspace(params.workspaceId);

  if (!workspacePages) return redirect(`/agency/${params.agencyId}/workspace`);

  return (
    <div>
      <Link
        href={`/agency/${params.agencyId}/workspaces`}
        className="flex items-center text-sm hover:opacity-75 transition mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to workspaces list
      </Link>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl">{workspacePages.name}</h1>
        <Actions
          isPublished={workspacePages.published}
          agencyId={params.agencyId}
          workspaceId={params.workspaceId}
          disabled={workspacePages.workspacePages.length === 0}
        />
      </div>
      <Tabs defaultValue="steps" className="w-full">
        <TabsList className="grid  grid-cols-2 w-[50%] bg-transparent ">
          <TabsTrigger value="steps">Steps</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="steps">
          <WorkspaceSteps
            workspace={workspacePages}
            agencyId={params.agencyId}
            pages={workspacePages.workspacePages}
            workspaceId={params.workspaceId}
          />
        </TabsContent>
        <TabsContent value="settings">
          <WorkspaceForm
            agencyId={params.agencyId}
            defaultData={workspacePages}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkspaceIdPage;
