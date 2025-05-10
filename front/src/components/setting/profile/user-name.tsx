import { FormInputWithoutLabel } from "@/components/ui/input";
import { User } from "@/interfaces/user";
import { User as UserIcon } from "lucide-react";

export default function SettingUserName({
  user,
  formData,
  onChange,
}: {
  user: User;
  formData: { name: string; image: string | File; password: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement> | { name: string; value: string }) => void;
}) {
  return (
    <div className="flex border w-full">
      <div className="w-1/5">
        <div className="px-7 py-10">이름</div>
      </div>
      <div className="w-1/4 flex">
        <div className="flex align-middle justify-center items-center">
          <FormInputWithoutLabel
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={onChange}
            icon={UserIcon}
          />
        </div>
      </div>
    </div>
  )
}