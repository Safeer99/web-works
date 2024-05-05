import { notFound } from "next/navigation";

import EditorProvider from "@/components/providers/editor";
import { Editor } from "@/components/editor";
import { getWorkspaceByDomain } from "@/lib/workspace-service";

interface Props {
  params: {
    domain: string;
  };
}

const DomainPage = async ({ params }: Props) => {
  const domainData = await getWorkspaceByDomain(params.domain.slice(0, -1));

  if (!domainData) return notFound();

  const pageData = domainData.workspacePages.find((page) => !page.pathName);

  if (!pageData) return notFound();

  return (
    <EditorProvider
      agencyId={domainData.agencyId}
      workspaceId={domainData.id}
      pageDetails={pageData}
    >
      <Editor liveMode pageDetails={pageData} />
    </EditorProvider>
  );
};

export default DomainPage;
