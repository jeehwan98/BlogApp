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
  FEEDBACK: `${BASE_URL}/feedback`,
  GET_CURRENT_USER_DETAILS: `${BASE_URL}/user/loggedInUser`,
  COMMENT: `${BASE_URL}/comments`,
});