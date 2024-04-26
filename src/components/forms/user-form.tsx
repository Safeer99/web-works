"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Role } from "@prisma/client";

import { useModal } from "@/hooks/use-modals";
import { AssociateWithUser } from "@/lib/types";
import { updateAssociatedAccount } from "@/lib/agency-service";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/loading";

interface Props {
  defaultData: AssociateWithUser;
}

export const UserForm = ({ defaultData }: Props) => {
  const modal = useModal();
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();
  const [value, setValue] = useState<Role>(defaultData.role);

  const onSubmit = async () => {
    if (value === Role.AGENCY_OWNER || value === defaultData.role) {
      modal.onClose();
      return;
    }

    startTransition(() => {
      updateAssociatedAccount({
        ...defaultData,
        role: value,
      })
        .then(() => {
          toast.success("Saved changes successfully.");
          modal.onClose();
          router.refresh();
        })
        .catch(() => toast.error("Could not saved!!!"));
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Info</CardTitle>
      </CardHeader>
      <CardContent>
        <Select
          disabled={isLoading}
          onValueChange={(value) => setValue(value as Role)}
          defaultValue={defaultData.role}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select user role..." />
          </SelectTrigger>
          <SelectContent className="z-[800]">
            <SelectItem value={Role.AGENCY_ADMIN}>Agency Admin</SelectItem>
            <SelectItem value={Role.AGENCY_USER}>Agency User</SelectItem>
          </SelectContent>
        </Select>
        <Button className="mt-4" disabled={isLoading} onClick={onSubmit}>
          {isLoading ? <Loading /> : "Save changes"}
        </Button>
      </CardContent>
    </Card>
  );
};
