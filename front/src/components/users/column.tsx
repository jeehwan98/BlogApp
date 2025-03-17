"use client"

import { ColumnDef } from "@tanstack/react-table"
import { formatDateWithTime } from "@/lib/constants/format"
import { ArrowUpDown } from "lucide-react"
import { User } from "@/interfaces/user"

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
