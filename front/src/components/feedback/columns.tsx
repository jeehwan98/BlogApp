"use client"

import { Feedback } from "@/interfaces/feedback"
import { ColumnDef } from "@tanstack/react-table"
import { formatDateWithTime } from "@/lib/constants/format"

export const columns: ColumnDef<Feedback>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "user.name",
    header: "User",
  },
  {
    accessorKey: "user.email",
    header: "Email",
  },
  {
    accessorKey: "content",
    header: "Content",
  },
  {
    accessorKey: "user.createdAt",
    header: () => <div className="text-right">Created At</div>,
    cell: ({ row }) => {
      const dateArray = row.original.createdAt;
      console.log("dateArray? ", dateArray);
      const formatted = formatDateWithTime(dateArray);

      return <div className="text-right font-medium">{formatted}</div>
    },
  }
]
