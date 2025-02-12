export function generateUniqueUserId(email: string): string {
  const [username, domainUrl] = getId(email);
  const domain = getDomain(domainUrl);
  return `${username}_${domain}`;
}

export function getId(email: string): [string, string] {
  return email.split("@") as [string, string];
}

export function getDomain(emailUrl: string): string {
  return emailUrl.split(".")[0];
}

export function getDomainAndUsername(username: string, domain: string): string {
  return `${username}@${domain}.com`;
}

export function convertIdToEmail(userId: string): string {
  const [username, domain] = userId.split("_");
  return getDomainAndUsername(username, domain);
}

export function splitUnderBar(userId: string): [string, string] {
  return userId.split("_") as [string, string];
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
export function formatDate(localDateTimeArray: number[]) {
  console.log("localDateTimeArray:", localDateTimeArray);

  const [year, month, day, hour, minute, second] = localDateTimeArray;
  const date = new Date(year, month - 1, day, hour, minute, second); // JavaScript months start from 0

  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatRelativeDate(localDateTimeArray: number[]) {
  console.log("localDateTimeArray:", localDateTimeArray);

  if (!Array.isArray(localDateTimeArray) || localDateTimeArray.length < 3) {
    return "Invalid date";
  }

  const [year, month, day, hour = 0, minute = 0, second = 0] = localDateTimeArray;
  const createdDate = new Date(year, month - 1, day, hour, minute, second);
  const today = new Date();

  // Calculate difference in days
  const diffInMs = today.getTime() - createdDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)); // Convert ms to days

  // If less than 7 days, show relative time
  if (diffInDays < 7) {
    return `${diffInDays}일 전`;
  }

  // Otherwise, show full date
  return createdDate.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function stringAvatar(name: string) {
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
  FETCH_USER: `${BASE_URL}/user`,
  GET_CURRENT_USER_DETAILS: `${BASE_URL}/user/loggedInUser`,
});