"use client";

import { useEffect, useTransition } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Board, Canvas } from "@prisma/client";
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
import { CanvasFormSchema } from "@/lib/types";
import { updateCanvas } from "@/lib/canvas-service";

interface CanvasFormProps {
  defaultData: Canvas;
  agencyId: string;
}

export const CanvasForm = ({ defaultData, agencyId }: CanvasFormProps) => {
  const router = useRouter();
  const onClose = useModal((state) => state.onClose);
  const [isLoading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CanvasFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(CanvasFormSchema),
    defaultValues: {
      title: defaultData?.title || "",
    },
  });

  useEffect(() => {
    if (defaultData) {
      form.reset({
        title: defaultData.title || "",
      });
    }
  }, [defaultData, form]);

  const onSubmit = (values: z.infer<typeof CanvasFormSchema>) => {
    if (!agencyId) return;

    startTransition(() => {
      updateCanvas({ ...defaultData, ...values })
        .then(() => {
          toast.success("Saved canvas details.");
          router.refresh();
          onClose();
        })
        .catch(() => toast.error("Could not save canvas details!"));
    });
  };

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle>Canvas Details</CardTitle>
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Canvas Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
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
