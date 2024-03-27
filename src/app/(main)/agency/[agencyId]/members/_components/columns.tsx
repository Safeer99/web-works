"use client";

import clsx from "clsx";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { Role } from "@prisma/client";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { MembersTable } from "@/lib/types";
import { CellActions } from "./cell-actions";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<MembersTable>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { name, imageUrl } = row.original;
      return (
        <div className="flex items-center gap-4">
          <div className="h-11 w-11 relative flex-none">
            <Image
              src={imageUrl}
              fill
              className="rounded-full object-cover"
              alt="avatar image"
            />
          </div>
          <span>{name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const role: Role = row.getValue("role");
      return (
        <Badge
          className={clsx("bg-slate-500 cursor-default", {
            "bg-emerald-500": role === "AGENCY_OWNER",
            "bg-orange-400": role === "AGENCY_ADMIN",
          })}
        >
          {role}
        </Badge>
      );
    },
  },
  {
    accessorKey: "joined",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Joined On
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="text-muted-foreground">
          {format(row.original.joined, "dd-MMMM-yyyy")}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const rowData = row.original;
      return <CellActions rowData={rowData} />;
    },
  },
];
