export function validateFormEmailInput(email: string) {
  if (!email || !email.includes("@")) {
    return {
      success: false,
      errors: { email: "Please enter a valid email address" }
    }
  }
}

export function validateFormPasswordInput(password: string) {
  if (!password || password.length < 6) {
    return {
      success: false,
      errors: { password: "Passwords must be at least 6 characters" }
    }
  }
}

export function validateFormCheckPasswordInput(password: string, confirmPassword: string) {
  if (password != confirmPassword) {
    return {
      success: false,
      errors: { confirmPassword: "Passwords do not match" }
    }
  }
}