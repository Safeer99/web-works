"use client";

import * as z from "zod";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Agency } from "@prisma/client";

import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
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
import { FileUpload } from "@/components/file-upload";
import { Loading } from "@/components/loading";
import { CustomAlertDialog } from "@/components/custom-alert-dialog";

import { deleteAgency, upsertAgency } from "@/lib/agency-service";
import { AgencyFormSchema } from "@/lib/types";
import { useModal } from "@/hooks/use-modals";

interface AgencyFormProps {
  defaultData?: Agency;
}

export const AgencyForm = ({ defaultData }: AgencyFormProps) => {
  const modal = useModal();
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AgencyFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(AgencyFormSchema),
    defaultValues: {
      name: defaultData?.name,
      address: defaultData?.address,
      agencyLogo: defaultData?.agencyLogo,
      city: defaultData?.city,
      companyEmail: defaultData?.companyEmail,
      companyPhone: defaultData?.companyPhone,
      country: defaultData?.country,
      state: defaultData?.state,
      zipCode: defaultData?.zipCode,
    },
  });

  useEffect(() => {
    if (defaultData) form.reset(defaultData);
  }, [defaultData, form]);

  const handleSubmit = async (values: z.infer<typeof AgencyFormSchema>) => {
    startTransition(() => {
      upsertAgency({ id: defaultData?.id, ownerId: "", ...values })
        .then((res) => {
          modal.onClose();
          toast.success(`Agecny saved successfully.`);
          if (defaultData?.id) router.refresh();
          else router.replace(`/agency/${res.id}`);
        })
        .catch(() => toast.error("Could not save agency!!!"));
    });
  };

  const handleDeleteAgency = () => {
    if (!defaultData || !defaultData.id) return;
    startTransition(() => {
      deleteAgency(defaultData.id)
        .then(() => {
          toast.success("Agency deleted successfully.");
          router.replace("/agency");
        })
        .catch(() => toast.error("Could not delete agency!!!"));
    });
  };

  return (
    <CustomAlertDialog
      onConfirm={handleDeleteAgency}
      description="This action cannot be undone. This will permanently delete the
    Agency account and all related data."
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Agency Information</CardTitle>
          <CardDescription>
            Lets create an agency for your business. You can edit agency
            settings later from the agency settings tab.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                disabled={isLoading}
                control={form.control}
                name="agencyLogo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agency Logo</FormLabel>
                    <FormControl>
                      <FileUpload
                        apiEndpoint="agencyLogo"
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col sm:flex-row gap-4">
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Agency Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Agency Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="companyEmail"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Agency Email</FormLabel>
                      <FormControl>
                        <Input
                          readOnly={!!defaultData?.companyEmail}
                          placeholder="Your Agency Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                disabled={isLoading}
                control={form.control}
                name="companyPhone"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Agency Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={isLoading}
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 st..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col sm:flex-row gap-4">
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Zipcode</FormLabel>
                      <FormControl>
                        <Input placeholder="Zipcode" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                disabled={isLoading}
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loading /> : "Save Agency Information"}
              </Button>
            </form>
          </Form>
          {defaultData?.id && (
            <div className="flex flex-col justify-between rounded-lg border border-destructive gap-4 p-4 mt-8">
              <div>
                <div>Danger Zone</div>
              </div>
              <div className="text-muted-foreground text-sm">
                Deleting your agency cannot be undone. This will also delete all
                data related to your accounts. Accounts related to agency will
                no longer have access to workspaces etc.
              </div>
              <AlertDialogTrigger
                disabled={isLoading}
                className="text-red-600 border-red-600 border-[1px] w-fit p-2 text-center mt-2 rounded-md hover:bg-red-600 hover:text-white whitespace-nowrap"
              >
                Delete Agency
              </AlertDialogTrigger>
            </div>
          )}
        </CardContent>
      </Card>
    </CustomAlertDialog>
  );
};
