"use client";
import React, { useEffect, useTransition } from "react";
import { v4 } from "uuid";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Board } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Loading } from "@/components/loading";
import { useModal } from "@/hooks/use-modals";
import { upsertBoard } from "@/lib/board-service";
import { BoardFormSchema } from "@/lib/types";

interface BoardFormProps {
  defaultData?: Board;
  agencyId: string;
}

export const BoardForm = ({ defaultData, agencyId }: BoardFormProps) => {
  const onClose = useModal((state) => state.onClose);
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof BoardFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(BoardFormSchema),
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
  }, [defaultData]);

  const onSubmit = (values: z.infer<typeof BoardFormSchema>) => {
    if (!agencyId) return;

    startTransition(() => {
      upsertBoard({
        id: defaultData?.id || v4(),
        agencyId,
        values,
      })
        .then(() => {
          toast.success("Saved board details.");
          router.refresh();
          onClose();
        })
        .catch(() => toast.error("Could not save board details!"));
    });
  };

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle>Board Details</CardTitle>
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
                  <FormLabel>Board Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
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
