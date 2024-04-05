"use client";
import { useEffect, useTransition } from "react";
import { z } from "zod";
import { v4 } from "uuid";
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
  }, [defaultData]);

  const onSubmit = (values: z.infer<typeof WorkspacePageSchema>) => {
    if (order !== 0 && !values.pathName) {
      return form.setError("pathName", {
        message:
          "Pages other than the first page in the funnel require a path name example 'secondstep'.",
      });
    }

    startTransition(() => {
      upsertWorkspacePage(agencyId, workspaceId, {
        name: values.name,
        id: defaultData?.id || v4(),
        order: defaultData?.order || order,
        pathName: values.pathName || "",
      })
        .then(() => {
          modal.onClose();
          toast.success("Save Page details successfully.");
          router.refresh();
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  const onCopy = async () => {
    if (!defaultData?.id) return;
    const res = await getWorkspace(workspaceId);
    const lastPage = res?.workspacePages.length;

    startTransition(() => {
      upsertWorkspacePage(agencyId, workspaceId, {
        id: v4(),
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
        .catch(() => toast.error("Something went wrong!"));
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
        .catch(() => toast.error("Something went wrong!"));
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
            <div className="flex items-center gap-3">
              <Button
                className="w-22 self-end"
                disabled={isLoading}
                type="submit"
              >
                Save Page
              </Button>

              {defaultData?.id && (
                <>
                  <Button
                    variant={"outline"}
                    className="w-22 self-end border-red-600 text-red-600 hover:bg-red-600"
                    disabled={isLoading}
                    type="button"
                    onClick={onDelete}
                  >
                    <Trash />
                  </Button>
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    disabled={isLoading}
                    type="button"
                    onClick={onCopy}
                  >
                    <CopyPlusIcon />
                  </Button>
                </>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
