import NextAuth, { getServerSession } from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import GithubProvider from "next-auth/providers/github"
import { AuthOptions } from "next-auth";

const adminEmails = ["miguelangelpacompia@gmail.com"]

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({session,token,user}) => {
      if (adminEmails.includes(session.user?.email || '')) {
        return session
      }
      return undefined!
    }
  }
}

export default NextAuth(authOptions)

export async function isAdminRequest(req: any,res: any) {
  const session = await getServerSession(req,res,authOptions);
  if (!adminEmails.includes(session?.user?.email || '')) {
    res.status(401);
    res.end();
    throw 'not an admin';
  }
}
