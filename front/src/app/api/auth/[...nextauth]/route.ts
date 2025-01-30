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
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await fetch(URL.LOGIN, {
            method: "POST",
            headers: URL.HEADERS,
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          });
          const responseData = await response.json();
          console.log("error message? ", responseData.error);

          if (!response.ok) {
            throw new Error(responseData.error);
          }

          return {
            id: responseData.id,
            name: responseData.name,
            email: responseData.email,
            image: responseData.image,
            username: responseData.username,
          }
        } catch (error) {
          console.error("Error during authentication:", error);
          throw (error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        image: token.image,
        username: token.username,
      };
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