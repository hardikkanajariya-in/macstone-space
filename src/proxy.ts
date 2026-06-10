import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import type { NextRequest } from "next/server";

const { auth } = NextAuth(authConfig);

export function proxy(request: NextRequest, event: any) {
  return auth(request, event);
}

export const config = {
  matcher: ["/admin/:path*"],
};
