"use client";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/modal";
import { UploadMediaForm } from "@/components/forms/upload-media-form";
import { useModal } from "@/hooks/use-modals";

type Props = {
  agencyId: string;
};

export const MediaUploadButton = ({ agencyId }: Props) => {
  const { onOpen } = useModal();

  return (
    <Button
      onClick={() => {
        onOpen(
          <Modal
            title="Upload Media"
            description="Upload a file to your media bucket"
          >
            <UploadMediaForm agencyId={agencyId}></UploadMediaForm>
          </Modal>
        );
      }}
    >
      Upload
    </Button>
  );
};
