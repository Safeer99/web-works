import { MediaComponent } from "@/components/media";
import { getMedia } from "@/lib/media-service";

interface Props {
  params: { agencyId: string };
}

const MediaPage = async ({ params }: Props) => {
  const data = await getMedia(params.agencyId);

  return <MediaComponent data={data} agencyId={params.agencyId} />;
};

export default MediaPage;
