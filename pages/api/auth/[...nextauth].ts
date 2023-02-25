import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import { verifyPassword } from "@/utils/passwordVerification";
import dbConnect from "@/utils/dbConnect";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }: any) {
      await dbConnect();

      const currentUser = await User.findOne({ email: session.user.email });

      if (!currentUser) {
        return session;
      }
      session.user = {
        id: currentUser._id.toString(),
        email: currentUser.email,
        name: currentUser.name,
        image: currentUser.image,
      };

      return session;
    },
  },
  providers: [
    CredentialProvider({
      credentials: { email: {}, password: {} },
      async authorize(credentials): Promise<any> {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        await dbConnect();

        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("User not found.");
        }

        const isPasswordValid = await verifyPassword(password, user.password);

        if (!isPasswordValid) {
          throw new Error("Invalid password.");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
});
