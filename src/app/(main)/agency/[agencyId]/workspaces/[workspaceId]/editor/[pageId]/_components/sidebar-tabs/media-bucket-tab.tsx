import { useEffect, useState } from "react";

interface Props {
  agencyId: string;
}

export const MediaBucketTab = ({ agencyId }: Props) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {};
    fetchData();
  }, [agencyId]);

  return <div className="h-[900px] scrollbar-hidden overflow-scroll p-4"></div>;
};
