import { MediaComponent } from "@/components/media";
import { getMedia } from "@/lib/media-service";
import { Agency, Media } from "@prisma/client";
import { useEffect, useState } from "react";

interface Props {
  agencyId: string;
}

export const MediaBucketTab = ({ agencyId }: Props) => {
  const [data, setData] = useState<(Agency & { media: Media[] }) | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMedia(agencyId);
      setData(res);
    };
    fetchData();
  }, [agencyId]);

  //TODO: abjust font sizes

  return (
    <div className="scrollbar-hidden overflow-scroll p-4">
      <MediaComponent data={data} agencyId={agencyId} />
    </div>
  );
};
