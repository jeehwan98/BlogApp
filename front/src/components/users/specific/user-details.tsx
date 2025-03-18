"use client"

import { FormInput } from "@/components/ui/input";
import { User } from "@/interfaces/user";
import { Mail, User as UserIcon } from "lucide-react";

export default function UserDetails({ user }: { user: User }) {

  return (
    <div className="w-2/3">
      <FormInput
        name="name"
        placeholder="John Doe"
        // error={state?.errors?.email}
        icon={UserIcon}
      />
      <FormInput
        name="email"
        placeholder="jee@email.com"
        // error={state?.errors?.email}
        icon={Mail}
      />
      <FormInput
        name="role"
        placeholder="jee@email.com"
        // error={state?.errors?.email}
        icon={UserIcon}
      />
    </div>
  )
}