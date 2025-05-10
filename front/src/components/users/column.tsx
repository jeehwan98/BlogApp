"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { User } from "@/interfaces/user"
import { useRouter } from "next/navigation"

export const columns: ColumnDef<User>[] = [
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
          Name
          <div className="flex justify-center align-center items-center">
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        </div>
      )
    },
    cell: ({ row }) => {
      const router = useRouter();
      const user = row.original
      return (
        <div
          onClick={() => router.push(`/users/${encodeURIComponent(user.email)}`)}
          className="cursor-pointer hover:underline text-slate-900 underline-offset-4 dark:text-slate-50"
        >
          {row.getValue("name")}
        </div>
      )
    },
  },
  {
    accessorKey: "email",
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
      const user = row.original
      return (
        <div
          onClick={() => router.push(`/users/${encodeURIComponent(user.email)}`)}
          className="cursor-pointer hover:underline text-slate-900 underline-offset-4 dark:text-slate-50"
        >
          {row.getValue("email")}
        </div>
      )
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex cursor-pointer"
        >
          Role
          <div className="flex justify-center align-center items-center">
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        </div>
      )
    },
  },
]
