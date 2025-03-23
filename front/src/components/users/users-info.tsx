"use client"

import { useCallback, useEffect, useState } from "react"
import { fetchAllUsersAPI } from "@/app/api/user";
import { User } from "@/interfaces/user";
import { DataTable } from "./data-table";
import { columns } from "./column";

export default function UsersInfo() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchUsers = useCallback(async () => {
    try {
      const allUsers = await fetchAllUsersAPI();
      setUsers(allUsers);
    } catch (error) {
      console.error("Error fetching all users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={users || []} />
    </div>
  )
}