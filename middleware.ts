import { isAuthenticated } from "@/utils/isAuth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/courses",
  "/courses/modules",
  "/courses/modules/[content]",
  "/grading",
  "/log-out",
  "/project",
  "/project/[project]",
  "/settings",
];

export default function middleware(req: NextRequest) {
  if (
    !isAuthenticated &&
    isProtectedRoute(req.nextUrl.pathname, protectedRoutes)
  ) {
    const absoluteURL = new URL("/sign-in", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}

//for dynamic routes e.g "/courses/modules/[content e.g 1]"
function isProtectedRoute(path: string, protectedRoutes: string[]): boolean {
  return protectedRoutes.some((route) => {
    const regex = new RegExp(`^${route.replace(/\[.*\]/, ".*")}$`);
    return regex.test(path);
  });
}
