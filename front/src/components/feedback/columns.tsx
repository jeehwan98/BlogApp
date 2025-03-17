"use client"

import { Feedback } from "@/interfaces/feedback"
import { ColumnDef } from "@tanstack/react-table"
import { formatDateWithTime } from "@/lib/constants/format"
import { ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export const columns: ColumnDef<Feedback>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
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
    accessorKey: "name",
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
