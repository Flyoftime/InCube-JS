import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    email: string;
    username: string;
    created_at: Date;
  }

  interface Session {
    user: {
      id: number;
      email: string;
      username: string;
    };
  }

  interface JWT {
    id: number;
    email: string;
    username: string;
  }
}
