import { User } from "@/interfaces/user";

export function HiddenInputs({ user }: { user: User }) {
  return (
    <>
      <input type="hidden" name="initialName" value={user.name || ""} />
      <input type="hidden" name="email" value={user.email || ""} />
      <input type="hidden" name="initialImage" value={user.image || ""} />
      <input type="hidden" name="initialRole" value={user.role || ""} />
    </>
  )
}