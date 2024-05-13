"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Agency, Invitation, Role } from "@prisma/client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { acceptInvitation, rejectInvitation } from "@/lib/invitation";

interface Props {
  invitation: Invitation & { agency: Agency };
}

export const InvitaionDialog = ({ invitation }: Props) => {
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();
  const [mounted, setMounted] = useState(false);

  const isExpired =
    invitation.expires.getMilliseconds() < new Date().getMilliseconds();

  useEffect(() => {
    if (!mounted) setMounted(true);
  }, [mounted]);

  if (!mounted) return null;

  const handleClick = (status: "ACCEPT" | "REJECT") => {
    if (status === "REJECT") {
      startTransition(() => {
        rejectInvitation(invitation.id)
          .then((res) => {
            toast.success("Invitation rejected successfully.");
            router.replace(`/agency/${res.agencyId}`);
          })
          .catch(() => toast.error("Something went wrong!"));
      });
    } else if (status === "ACCEPT") {
      startTransition(() => {
        acceptInvitation(invitation.token)
          .then(() => {
            toast.success("Invitation accepted successfully.");
            router.replace("/agency");
          })
          .catch(() => toast.error("Something went wrong!"));
      });
    }
  };

  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isExpired ? "Invitation Expired !!!" : "Agency Invitation"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isExpired
              ? "This invitation is already has been expired please request for another invitation to the agency you were invited by."
              : `${
                  invitation.agency.name
                } invites you to join there agency as the role of ${
                  invitation.role === Role.AGENCY_ADMIN ? '"ADMIN"' : '"USER"'
                }.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {isExpired ? (
            <AlertDialogAction>Continue</AlertDialogAction>
          ) : (
            <>
              <AlertDialogCancel
                className="mr-2"
                disabled={isLoading}
                onClick={() => handleClick("REJECT")}
              >
                Reject Invitation
              </AlertDialogCancel>
              <AlertDialogAction
                disabled={isLoading}
                onClick={() => handleClick("ACCEPT")}
              >
                Accept Invitation
              </AlertDialogAction>
            </>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
