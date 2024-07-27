import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

const handler = NextAuth({
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID!,
      clientSecret: process.env.COGNITO_CLIENT_SECRET!,
      issuer: process.env.COGNITO_ISSUER!,
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account, profile, isNewUser }) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.auth_time = Math.floor(Date.now() / 1000);
        token.accessToken = account.access_token;
      }
      return Promise.resolve(token);
    },
    session: async ({ session, token, user }) => {
      const newSession = JSON.parse(JSON.stringify(session))
      newSession.user["id"] = token["id"];
      newSession.accessToken = token?.accessToken || token.account["accessToken"]; 
      return newSession;
    },
  },
});
export { handler as GET, handler as POST };
