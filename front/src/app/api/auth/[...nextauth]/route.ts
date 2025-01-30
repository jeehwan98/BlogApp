import { URL } from "@/lib/constants";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    // github
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),

    // custom login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await fetch(URL.LOGIN, {
            method: "POST",
            headers: URL.HEADERS,
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });
          const responseData = await response.json();

          if (!response.ok) {
            throw new Error(responseData.error);
          }

          console.log(responseData);
          return {
            token: responseData.token,
            id: responseData.id,
            name: responseData.name,
            email: responseData.email,
            image: responseData.image,
          }
        } catch (error) {
          console.error("Error during authentication:", error);
          throw (error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "github" && user) {
        console.log("user:", user);
        try {
          const response = await fetch(URL.LOGIN_GITHUB, {
            method: "POST",
            headers: URL.HEADERS,
            body: JSON.stringify({
              name: user.name,
              email: user.email,
              image: user.image,
            }),
          });

          if (!response.ok) {
            console.error("Failed to save github user in the backend");
          }
        } catch (error) {
          console.error("Error saving github user: ", error);
        }
      }
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        image: token.image,
      };
      session.accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };