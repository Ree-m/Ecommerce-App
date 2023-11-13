// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import connectMongo from "@/utils/connectMongo";
// import dotenv from "dotenv";
// import User from "@/models/User";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import clientPromise from "@/utils/mongodb";
// import bcrypt from "bcryptjs";


// dotenv.config();



// export const authOptions: NextAuthOptions = {
//     adapter: MongoDBAdapter(clientPromise),

//     session: {
//         strategy: "jwt",
//     },
//     secret: process.env.NEXTAUTH_SECRET!,
//     // Configure one or more authentication providers
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID!,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//         }),
//         // ...add more providers here
//         CredentialsProvider({
//             name: "Credentials",
//             id: "credentials",
//             credentials: {
//                 email: {
//                     label: "email",
//                     type: "email",
//                     placeholder: "email@example.com",
//                 },
//                 password: { label: "Password", type: "password" },
//             },
//             async authorize(credentials, req) {
//                 console.log("nextauth credentails",credentials)

//                 await connectMongo();
//                 // Add logic here to look up the user from the credentials supplied
//                 if (credentials == null) return null;
//                 // login

//                 try {
//                     const user = await User.findOne({ email: credentials.email });
//                     console.log("nextauth user", user)
//                     if (user) {
//                         console.log("comparing")
//                         const isMatch = await bcrypt.compare(
//                             credentials.password,
//                             user.password,
//                         );
//                         if (isMatch) {
//                             console.log("nextauth user match", user)

//                             return user;
//                         } else {
//                             throw new Error("Email or password is incorrect");
//                         }
//                     } else {
//                         throw new Error("User not found");
//                     }
//                 } catch (err: any) {
//                     throw new Error(err);
//                 }
//             },
//         }),
//     ],
//     pages: {
//         signIn: "/auth/login",
//         newUser: "/",
//         error: "/auth/login",
//     },
//     callbacks: {
//         // We can pass in additional information from the user document MongoDB returns
//         async jwt({ token, user }: any) {
//             if (user) {
//                 console.log("tokrn user",user)
//                 token.user = {
//                     id: user._id,
//                     email: user.email,
//                     name: user.name,
//                     role:user.role
//                 };
//             }
//             return token;
//         },
//         // If we want to access our extra user info from sessions we have to pass it the token here to get them in sync:
//         session: async ({ session, token }: any) => {
//             if (token) {
//                 console.log("nextauth token", token)

//                 session.user = token.user;
//             }
//             console.log("nextauth session", session)
//             return session;
//         },
//     },
// };

// export default NextAuth(authOptions);