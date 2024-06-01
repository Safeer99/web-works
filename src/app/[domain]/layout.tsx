import { getWorkspaceByDomain } from "@/lib/workspace-service";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  children: React.ReactNode;
  params: {
    domain: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const domainData = await getWorkspaceByDomain(params.domain.slice(0, -1));

  if (!domainData) return notFound();

  if (domainData.favicon) {
    return {
      title: domainData.name,
      description: domainData.description,
      icons: {
        icon: [
          {
            url: domainData.favicon,
            href: domainData.favicon,
          },
        ],
      },
    };
  }
  return {
    title: domainData.name,
    description: domainData.description,
  };
}

const Layout = ({ children }: Props) => {
  return <>{children}</>;
};

export default Layout;
