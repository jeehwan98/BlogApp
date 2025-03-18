import ProfileAvatar from "@/components/avatar";
import { SettingsProfileContainer, SettingsProfileTitle } from "@/components/setting/components";
import SettingsUserDetails from "@/components/setting/profile/user-details";
import { FormInputWithoutLabel } from "@/components/ui/input";
import { getServerSession } from "@/lib/auth/auth-server"
import { User as UserIcon } from "lucide-react";
import { toast } from "sonner";

export default async function SettingProfilePage() {
  const user = await getServerSession();

  if (!user) {
    return ("/");
  }

  console.log("user details?: ", user);
  return (
    <SettingsProfileContainer>
      <SettingsProfileTitle />
      <SettingsUserDetails user={user} />
    </SettingsProfileContainer>
  )
}

// "use client";

// import ProfileAvatar from "@/components/avatar";
// import { FormInputWithoutLabel } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { User as UserIcon } from "lucide-react";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useActionState } from "react";
// import { getServerSession } from "@/lib/auth/auth-server";
// import updateUserProfileAction from "./action";
// import { toast } from "sonner";
// import UserProfileSettings from "@/components/setting/profile";

// export default function SettingProfilePage() {
//   const [user, setUser] = useState<{ name: string; image?: string } | null>(null);
//   const [name, setName] = useState(""); // Input value
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();

//   // fetch user data on mount
//   useEffect(() => {
//     async function fetchUser() {
//       const session = await getServerSession();
//       if (!session) {
//         router.push("/");
//         return;
//       }
//       setUser(session);
//       setName(session.name || "");
//       setIsLoading(false);
//     }
//     fetchUser();
//   }, [router]);

//   // use useActionState for form submission
//   const [state, formAction, isPending] = useActionState(updateUserProfileAction, {
//     success: false,
//     message: "",
//     errors: {},
//   });

//   useEffect(() => {
//     if (state.success) {
//       toast.success("Profile updated successfully!");
//       setUser((prev) => (prev ? { ...prev, name } : null));
//     }
//   }, [state.success, name]);

//   const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setName(e.target.value);
//   };

//   if (isLoading) return <div>Loading...</div>;

//   if (!user) return null;

//   const isNameChanged = name !== user.name;

//   return (
//     <div className="mx-10">
//       <h1 className="text-3xl font-bold mt-7 mb-5">프로핀 수정</h1>
//       <form action={formAction}>
//         {/* <UserProfileSettings user={user} /> */}
//         <div className="flex border w-full items-center justify-center align-middle">
//           <div className="w-1/3">
//             <div className="px-5 py-5">프로필 사진</div>
//           </div>
//           <div className="w-2/3">
//             <ProfileAvatar
//               image={user?.image}
//               name={user.name}
//               sx={{
//                 width: { xs: 100, sm: 150, md: 200 },
//                 height: { xs: 100, sm: 150, md: 200 },
//                 fontSize: { xs: 60, sm: 90, md: 130 },
//               }}
//               fontSize={130}
//             />
//           </div>
//         </div>

//         <div className="flex border w-full items-center justify-center align-middle">
//           <div className="w-1/3">
//             <div className="px-5 py-5">이름</div>
//           </div>
//           <div className="w-2/3">
//             <FormInputWithoutLabel
//               name="name"
//               placeholder="John Doe"
//               value={name}
//               onChange={handleNameChange}
//               icon={UserIcon}
//               error={state.errors?.name}
//             />
//           </div>
//         </div>
//         {state.errors?.general && (
//           <p className="text-red-500 text-sm mt-2">{state.errors.general}</p>
//         )}
//         <div className="mt-5 flex justify-end">
//           <Button type="submit" disabled={!isNameChanged || isPending}>
//             {isPending ? "Updating..." : "Update"}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }