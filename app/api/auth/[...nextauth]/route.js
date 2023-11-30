import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "@/utils/connectMongo";
import dotenv from "dotenv";
import User from "@/models/User";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/utils/mongodb";

dotenv.config();

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true, 
    }),

    CredentialsProvider({
      async authorize(credentials, req) {
        connectMongo();
        console.log("starting credientials login");
        const { email, password } = credentials;
        console.log("credentials backend ", credentials);
        let user = await User.findOne({ email,password });
        if (!user) {
          throw new Error("Invalid Email or Password");
        }
        console.log("credientials login", user);

        return user;
      },
    }),
  ],
  callbacks: {
    session({ session, token, user }) {
      console.log("session  first", session, "user", user, "token", token)
      session = {
        ...session,
        user: {
          id: token.sub,
          ...session.user,

        },
      };
      console.log("session", session);
      return session;
    },

    
    // async signIn({ user, account }) {


    //   if (account.provider === "google") {
    //     console.log("google user", user, account)
    //     try {
    //       await connectMongo();

    //       // check if user already exists
    //       const userExists = await User.findOne({ email: user.email });
    //       console.log("user exists", userExists)
    //       // if not, create a new document and save user in MongoDB
    //       if (!userExists) {
    //         await User.create({
    //           email: user.email,
    //           name: user.name,
    //           image: user.image,
    //           address:"",
    //           phone:0,

    //         });
    //       }

    //       return true
    //     } catch (error) {
    //       console.log("Error checking if user exists: ", error.message);
    //       return false
    //     }
    //   }
    // },

  },
  adapter: MongoDBAdapter(clientPromise),

  pages: {
    signIn: "/auth/login",
    error: "/auth/login",

  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  allowDangerousEmailAccountLinking: true
});

export { handler as GET, handler as POST };