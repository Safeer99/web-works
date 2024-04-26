"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { User2 } from "lucide-react";
import { Tag, User } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";

import { useModal } from "@/hooks/use-modals";
import { TicketAndTags, TicketFormSchema } from "@/lib/types";
import { getAllTeamMembers } from "@/lib/agency-service";
import { upsertTicket } from "@/lib/board-service";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/loading";
import { TagCreator } from "@/components/tag-creator";

interface TicketFormProps {
  laneId: string;
  agencyId: string;
  defaultData?: TicketAndTags;
}

export const TicketForm = ({
  laneId,
  agencyId,
  defaultData,
}: TicketFormProps) => {
  const router = useRouter();
  const onClose = useModal((state) => state.onClose);
  const [isLoading, startTransition] = useTransition();

  const [tags, setTags] = useState<Tag[]>([]);
  const [allTeamMembers, setAllTeamMembers] = useState<User[]>([]);
  const [assignedTo, setAssignedTo] = useState(defaultData?.assigned?.id || "");

  const form = useForm<z.infer<typeof TicketFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(TicketFormSchema),
    defaultValues: {
      name: defaultData?.name || "",
      description: defaultData?.description || "",
    },
  });

  useEffect(() => {
    if (agencyId) {
      const fetchData = async () => {
        const response = await getAllTeamMembers(agencyId);
        const users = response.map((res) => res.user);
        if (response) setAllTeamMembers(users);
      };
      fetchData();
    }
  }, [agencyId]);

  useEffect(() => {
    if (defaultData) {
      form.reset({
        name: defaultData.name || "",
        description: defaultData.description || "",
      });
    }
  }, [defaultData, form]);

  const onSubmit = async (values: z.infer<typeof TicketFormSchema>) => {
    if (!laneId) return;

    startTransition(() => {
      upsertTicket(
        { ...values, laneId, id: defaultData?.id, assignedUserId: assignedTo },
        tags
      )
        .then((res) => {
          toast.success("Saved details successfully.");
          router.refresh();
          onClose();
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Ticket Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              disabled={isLoading}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ticket Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <h3>Add tags</h3>
            <TagCreator
              agencyId={agencyId}
              getSelectedTags={setTags}
              defaultTags={defaultData?.tags || []}
            />
            <FormLabel>Assigned To Team Member</FormLabel>
            <Select onValueChange={setAssignedTo} defaultValue={assignedTo}>
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage alt="contact" />
                        <AvatarFallback className="bg-primary text-sm text-white">
                          <User2 size={14} />
                        </AvatarFallback>
                      </Avatar>

                      <span className="text-sm text-muted-foreground">
                        Not Assigned
                      </span>
                    </div>
                  }
                />
              </SelectTrigger>
              <SelectContent className="z-[999]">
                {allTeamMembers.map((teamMember) => (
                  <SelectItem key={teamMember.id} value={teamMember.id}>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage alt="contact" src={teamMember.imageUrl} />
                        <AvatarFallback className="bg-primary text-sm text-white">
                          <User2 size={14} />
                        </AvatarFallback>
                      </Avatar>

                      <span className="text-sm text-muted-foreground">
                        {teamMember.name}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button className="w-20 mt-4" disabled={isLoading} type="submit">
              {isLoading ? <Loading /> : "Save"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
