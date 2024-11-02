import type { NextAuthConfig } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github'; // Example provider

export const authConfig = {
  pages: {
    signIn: '/login', // Custom login page
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashboard) {
        if (isLoggedIn) return true; // Allow access to dashboard if logged in
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // If logged in and not on dashboard, redirect to dashboard
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true; // Allow access to other pages
    },
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID, // Your GitHub client ID
      clientSecret: process.env.GITHUB_SECRET, // Your GitHub client secret
    }),
    // Add other providers as needed
  ],
} satisfies NextAuthConfig;
