"use client";

import * as z from "zod";
import { useEffect, useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CopyPlusIcon, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { WorkspacePage } from "@prisma/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WorkspacePageSchema } from "@/lib/types";
import {
  deleteWorkspacePage,
  getWorkspace,
  upsertWorkspacePage,
} from "@/lib/workspace-service";
import { useModal } from "@/hooks/use-modals";

interface Props {
  defaultData?: WorkspacePage;
  workspaceId: string;
  order: number;
  agencyId: string;
}

export const WorkspacePageForm = ({
  agencyId,
  order,
  workspaceId,
  defaultData,
}: Props) => {
  const modal = useModal();
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof WorkspacePageSchema>>({
    resolver: zodResolver(WorkspacePageSchema),
    mode: "onChange",
    defaultValues: {
      name: defaultData?.name || "",
      pathName: defaultData?.pathName || "",
    },
  });

  useEffect(() => {
    if (defaultData) {
      form.reset({ name: defaultData.name, pathName: defaultData.pathName });
    }
  }, [defaultData, form]);

  const onSubmit = (values: z.infer<typeof WorkspacePageSchema>) => {
    if (order !== 0 && !values.pathName) {
      return form.setError("pathName", {
        message:
          "Pages other than the first page in the funnel require a path name example 'secondstep'.",
      });
    }

    startTransition(() => {
      upsertWorkspacePage(agencyId, {
        id: defaultData?.id,
        order: defaultData?.order || order,
        name: values.name,
        pathName: values.pathName || "",
        workspaceId,
      })
        .then(() => {
          modal.onClose();
          toast.success("Save Page details successfully.");
          router.refresh();
        })
        .catch(() => toast.error("Could not save page!!!"));
    });
  };

  const onCopy = async () => {
    if (!defaultData?.id) return;
    const res = await getWorkspace(workspaceId);
    const lastPage = res?.workspacePages.length;

    startTransition(() => {
      upsertWorkspacePage(agencyId, {
        workspaceId,
        order: lastPage ? lastPage : 0,
        name: `${defaultData.name} Copy`,
        pathName: `${defaultData.pathName}copy`,
        content: defaultData.content,
        previewImage: defaultData.previewImage,
      })
        .then(() => {
          toast.success("Copied Page successfully.");
          router.refresh();
        })
        .catch(() => toast.error("Could not copy page!!!"));
    });
  };

  const onDelete = () => {
    if (!defaultData?.id) return;
    startTransition(() => {
      deleteWorkspacePage(defaultData.id)
        .then(() => {
          toast.success("Page deleted successfully.");
          router.refresh();
        })
        .catch(() => toast.error("Could not delete page!!!"));
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workspace Page</CardTitle>
        <CardDescription>
          Workspace pages are flow in the order they are created by default. You
          can move them around to change their order.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              disabled={isLoading}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading || order === 0}
              control={form.control}
              name="pathName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Path Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Path for the page"
                      {...field}
                      value={field.value?.toLowerCase()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between">
              <Button
                className="w-22 self-end"
                disabled={isLoading}
                type="submit"
              >
                Save Page
              </Button>

              {defaultData?.id && (
                <div>
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    disabled={isLoading}
                    type="button"
                    onClick={onCopy}
                  >
                    <CopyPlusIcon />
                  </Button>
                  <Button
                    variant={"outline"}
                    className="w-22 self-end ml-4 border-red-600 text-red-600 hover:bg-red-600"
                    disabled={isLoading}
                    type="button"
                    onClick={onDelete}
                  >
                    <Trash />
                  </Button>
                </div>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
