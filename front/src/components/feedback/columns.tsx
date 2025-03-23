"use client"

import { Feedback } from "@/interfaces/feedback"
import { ColumnDef } from "@tanstack/react-table"
import { formatDateWithTime } from "@/lib/constants/format"
import { ArrowUpDown } from "lucide-react"
import { useRouter } from "next/navigation"

export const columns: ColumnDef<Feedback>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex cursor-pointer"
        >
          ID
          <div className="flex justify-center align-center items-center">
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "user.name",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex cursor-pointer"
        >
          User
          <div className="flex justify-center align-center items-center">
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        </div>
      )
    },
    cell: ({ row }) => {
      const router = useRouter();
      const userName = row.original.user.name;
      const userEmail = row.original.user.email;
      return (
        <div
          onClick={() => router.push(`/users/${encodeURIComponent(userEmail)}`)}
          className="cursor-pointer hover:underline text-slate-900 underline-offset-4 dark:text-slate-50"
        >
          {userName}
        </div>
      )
    },
  },
  {
    accessorKey: "user.email",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex cursor-pointer"
        >
          Email
          <div className="flex justify-center align-center items-center">
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        </div>
      )
    },
    cell: ({ row }) => {
      const router = useRouter();
      const userEmail = row.original.user.email;
      return (
        <div
          onClick={() => router.push(`/users/${encodeURIComponent(userEmail)}`)}
          className="cursor-pointer hover:underline text-slate-900 underline-offset-4 dark:text-slate-50"
        >
          {userEmail}
        </div>
      )
    },
  },
  {
    accessorKey: "content",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex cursor-pointer"
        >
          Content
          <div className="flex justify-center align-center items-center">
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "user.createdAt",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex cursor-pointer"
        >
          Created At
          <div className="flex justify-center align-center items-center">
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        </div>
      );
    },
    cell: ({ row }) => {
      const dateArray = row.original.createdAt;
      const formatted = formatDateWithTime(dateArray);

      return <div className="text-left font-medium">{formatted}</div>;
    },
    // header: () => <div className="">Created At</div>,
    // cell: ({ row }) => {
    //   const dateArray = row.original.createdAt;
    //   const formatted = formatDateWithTime(dateArray);

    //   return (
    //     <Button
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //       className="w-full p-0 gap-0 justify-normal"
    //     >
    //       {formatted}
    //       <ArrowUpDown className="ml-2 h-4 w-4" />
    //     </Button>
    //   )
    // },
  }
]
