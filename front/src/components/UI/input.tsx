import { FormInputProps, FormInputWithoutLabelProps, ImageUploadProps, PasswordInputProps, UserFormInputProps } from "@/interfaces/inputs";
import * as React from "react"
import { cn } from "@/lib/utils"
import { Eye, EyeOff, Lock } from "lucide-react"
import { capitalizeFirstLetter } from "@/lib/constants/format";
import Image from "next/image";
import defaultCameraImage from "../../../public/images/default-camera.jpg";
import { Button } from "./button";

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export function PasswordInput({
  name,
  placeholder,
  togglePasswordVisibility,
  showPassword,
  error
}: PasswordInputProps) {
  return (
    <div className="">
      <label className="pl-1 font-medium">{capitalizeFirstLetter(placeholder)}</label>
      <div className="relative mt-1">
        <Input
          type={showPassword ? "text" : "password"}
          name={name}
          placeholder="••••••••"
          className="pl-10 pr-4 py-3 w-full mb-2 h-10"
          required
        />
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}

export function FormInput({
  name,
  placeholder,
  error,
  icon: Icon
}: FormInputProps) {
  return (
    <div className="mb-5">
      <label className="pl-1 font-medium">{capitalizeFirstLetter(name)}</label>
      <div className="relative mt-1">
        <Input
          type={name}
          name={name}
          placeholder={placeholder}
          className="pl-10 pr-4 py-3 w-full mb-2 h-10"
          required
        />
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-3 ml-1">{error}</p>}
    </div>
  )
}

export function FormInputWithoutLabel({
  name,
  placeholder,
  error,
  value,
  onChange,
  icon: Icon
}: FormInputWithoutLabelProps) {
  return (
    <div className="">
      <div className="relative mt-1">
        <Input
          type={name}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="pl-10 pr-4 py-3 w-full mb-2 h-10"
          required
        />
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-3 ml-1">{error}</p>}
    </div>
  )
}

export function UserFormInput({
  name,
  placeholder,
  error,
  value,
  icon: Icon,
  onChange,
  disabled,
}: UserFormInputProps) {
  return (
    <div className="mb-5">
      <label className="pl-1 font-medium">{capitalizeFirstLetter(name)}</label>
      <div className="relative mt-1">
        <Input
          type={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="pl-10 pr-4 py-3 w-full mb-2 h-10"
          required
        />
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-3 ml-1">{error}</p>}
    </div>
  )
}

export function FormImageInput({
  name,
  previewUrl,
  fileInputRef,
  handleImageChange,
  triggerFileInput
}: ImageUploadProps) {
  return (
    <div className="relative w-40 h-40 mx-auto mb-24">
      {/* Profile Image */}
      <Image
        className="object-cover w-full h-full rounded-full"
        src={previewUrl || defaultCameraImage}
        width={200}
        height={200}
        alt="Profile Image"
      />
      <input
        name={name}
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleImageChange}
      />
      <div className="flex flex-col items-center mt-2">
        <Button
          type="button"
          onClick={triggerFileInput}
          className="mt-2"
        >
          Upload
        </Button>
      </div>
    </div>
  )
}