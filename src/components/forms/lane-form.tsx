"use client";

import React, { useEffect, useTransition } from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Workspace, Lane, Board } from "@prisma/client";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { LaneFormSchema } from "@/lib/types";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModal } from "@/hooks/use-modals";
import { toast } from "sonner";
import { Loading } from "../loading";
import { upsertLane } from "@/lib/board-service";

interface LaneFormProps {
  defaultData?: Lane;
  boardId: string;
}

export const LaneForm = ({ defaultData, boardId }: LaneFormProps) => {
  const onClose = useModal((state) => state.onClose);
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LaneFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(LaneFormSchema),
    defaultValues: {
      name: defaultData?.name || "",
    },
  });

  useEffect(() => {
    if (defaultData) {
      form.reset({
        name: defaultData.name || "",
      });
    }
  }, [defaultData, form]);

  const onSubmit = (values: z.infer<typeof LaneFormSchema>) => {
    if (!boardId) return;

    startTransition(() => {
      upsertLane({
        id: defaultData?.id,
        boardId,
        order: defaultData?.order,
        ...values,
      })
        .then(() => {
          toast.success("Saved Lane details.");
          router.refresh();
          onClose();
        })
        .catch(() => toast.error("Could not save lane details!"));
    });
  };

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle>Lane Details</CardTitle>
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
                  <FormLabel>Lane Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Lane Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-20 mt-4" disabled={isLoading} type="submit">
              {isLoading ? <Loading /> : "Save"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
