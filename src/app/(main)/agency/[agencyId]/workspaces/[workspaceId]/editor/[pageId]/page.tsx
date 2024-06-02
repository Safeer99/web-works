import { db } from "@/lib/db";
import { redirect } from "next/navigation";

import EditorProvider from "@/components/providers/editor";
import SocketProvider from "@/components/providers/socket-provider";

import { EditorNavigation } from "./_components/editor-navigation";
import { EditorSidebar } from "./_components/editor-sidebar";
import { Wrapper } from "./_components/wrapper";
import { EditorComponent } from "./_components/editor-component";

interface Props {
  params: {
    agencyId: string;
    workspaceId: string;
    pageId: string;
  };
}

const EditorPage = async ({ params }: Props) => {
  const pageDetails = await db.workspacePage.findUnique({
    where: {
      id: params.pageId,
      workspaceId: params.workspaceId,
    },
  });

  if (!pageDetails) {
    return redirect(
      `/agency/${params.agencyId}/workspaces/${params.workspaceId}`
    );
  }

  return (
    <div className="fixed w-full top-0 bottom-0 left-0 right-0 z-[100] bg-background">
      <EditorProvider
        agencyId={params.agencyId}
        workspaceId={params.workspaceId}
        pageDetails={pageDetails}
      >
        <SocketProvider agencyId={params.agencyId} roomId={params.pageId}>
          <Wrapper>
            <EditorNavigation
              agencyId={params.agencyId}
              workspaceId={params.workspaceId}
              pageDetails={pageDetails}
            />
            <EditorComponent pageDetails={pageDetails} />
            <EditorSidebar agencyId={params.agencyId} />
          </Wrapper>
        </SocketProvider>
      </EditorProvider>
    </div>
  );
};

export default EditorPage;
