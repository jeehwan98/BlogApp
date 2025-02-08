export function getUserId(input: string): string {
  return input.split("@")[0];
}

export function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

export function formateDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

export function stringAvatar(name: string) {
  console.log("name?: ", name);
  const initials = name
    .split(" ")
    .map((n) => {
      // Check if the character is Korean
      if (/[\u3131-\uD79D]/.test(n)) {
        return n[0]; // first character of Korean
      } else {
        return n[0]; // first character of English
      }
    })
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials,
  };
}

const secret = process.env.NEXTAUTH_SECRET || "default_secret_key";

export const HS256_JWK = {
  kty: "oct",
  k: Buffer.from(secret).toString("base64"), // convert secret to Base64
  alg: "HS256",
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const URL = Object.freeze({
  HEADERS: { 'Content-Type': 'application/json' },
  HEADERS_ACCEPT: { 'Accept': 'application/json' },
  LOGIN_GITHUB: `${BASE_URL}/auth/login/github`,
  REGISTER_USER_EMAIL: `${BASE_URL}/auth/register`,
  CHECK_EXISTING_USER: `${BASE_URL}/auth/checkUser`,
  REGISTER_USER_GITHUB: `${BASE_URL}/auth/register/github`,
  LOGIN: `${BASE_URL}/auth/login`,
  LOGOUT: `${BASE_URL}/auth/logout`,
  BLOG: `${BASE_URL}/blog`,
  GET_CURRENT_USER_DETAILS: `${BASE_URL}/user/loggedInUser`,
});