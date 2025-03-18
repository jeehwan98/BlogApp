"use client"

import { UserFormInput } from "@/components/ui/input";
import { User } from "@/interfaces/user";
import { Mail, User as UserIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Role } from "@/interfaces/user";

type FormState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
};

export default function UserDetails({
  user,
  formData,
  onChange,
  isEditing,
  state,
}: {
  user: User;
  formData: { name: string; email: string; role: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement> | { name: string; value: string }) => void;
  isEditing: boolean;
  state: FormState;
}) {
  return (
    <div className="w-2/3 ml-20">
      <div className="w-2/5">
        <UserFormInput
          name="name"
          placeholder="John Doe"
          error={state?.errors?.name}
          value={formData.name}
          onChange={onChange}
          icon={UserIcon}
          disabled={!isEditing}
        />
        <UserFormInput
          name="email"
          placeholder="jee@email.com"
          value={formData.email} // Fixed in previous response
          onChange={onChange}
          error={state?.errors?.email}
          icon={Mail}
          disabled={!isEditing}
        />
        <label className="pl-1 font-medium">Role</label>
        <div className="relative mt-1">
          {isEditing ? (
            <Select
              name="role"
              value={formData.role}
              onValueChange={(value) => onChange({ name: "role", value })}
            >
              <SelectTrigger className="pl-10 pr-4 py-3 w-full mb-2 h-10">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(Role).map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="pl-10 pr-4 py-3 w-full mb-2 h-10 border rounded-md flex items-center bg-gray-100">
              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              {formData.role}
            </div>
          )}
        </div>
        {state.errors?.role && (
          <p className="text-red-500 text-sm mt-1">{state.errors.role}</p>
        )}
        {state.errors?.general && (
          <p className="text-red-500 text-sm mt-1">{state.errors.general}</p>
        )}
      </div>
    </div>
  );
}