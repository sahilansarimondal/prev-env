import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth;
      const { nextUrl } = request;

      // If logged in and on the login page, redirect to dashboard
      if ((isLoggedIn && nextUrl.pathname === "/login") || "/") {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      // Allow access to all other routes
      return true;
    },
  },
});
