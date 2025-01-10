import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptionts: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await prisma.users.findUnique({
          where: { email },
        });

        if (user && user.password) {
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
            const { password, ...userWithoutPassword } = user;

            // Pastikan objek ini cocok dengan tipe User
            return {
              id: userWithoutPassword.id,
              email: userWithoutPassword.email,
              username: userWithoutPassword.username,
              created_at: userWithoutPassword.created_at,
            };
          }
        }
        return null; // Jika login gagal
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as number,
        email: token.email as string,
        username: token.username as string,
      };
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptionts);
export { handler as GET, handler as POST };
