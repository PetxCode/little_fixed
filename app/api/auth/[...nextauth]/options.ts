import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          name: "email",
          label: "Username",
          type: "text",
          placeholder: "jsmith",
        },
        password: { name: "password", label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(
          "http://localhost:3000/api/user/create/signin",
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await res.json();
        console.log(user);
        if (user) {
          return {
            ...user,
            name: user.data.name,
            email: user.data.email,
            id: user.data._id,
          };
        }
        return null;
      },
    }),
  ],

  pages: {
    signIn: "/signin",
  },

  callbacks: {
    async redirect() {
      return "/";
    },
    async jwt({ user, token }: any) {
      if (user) token.id = user.id;
      return token;
    },

    async session({ session, token }: any) {
      if (session) session.user.id = token.id;
      return session;
    },
  },
};
