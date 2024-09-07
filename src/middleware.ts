import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/site", "/api/uploadthing"],
  async beforeAuth(auth, req) {},
  async afterAuth(auth, req) {
   

    const url = req.nextUrl;
    const searchParams = url.searchParams.toString();
    const hostname = req.headers.get("host"); // Correct way to get the host header

    // Construct the path with search parameters
    const pathWithSearchParams =
      url.pathname + (searchParams.length > 0 ? "?" + searchParams : "");

    // Check for a custom subdomain
    const customSubDomain = hostname
      ? hostname.split(process.env.NEXT_PUBLIC_DOMAIN).filter(Boolean)[0]
      : null;

    if (customSubDomain) {
      return NextResponse.rewrite(
        new URL("/" + customSubDomain + pathWithSearchParams, req.url)
      );
    }

    // Handle sign-in and sign-up redirects
    if (url.pathname === "/sign-in" || url.pathname === "/sign-up") {
      return NextResponse.redirect(new URL("/agency/sign-in", req.url));
    }

    // Rewrite root and site path if host matches the public domain
    if (
      (url.pathname === "/" || url.pathname === "/site") &&
      hostname === process.env.NEXT_PUBLIC_DOMAIN
    ) {
      return NextResponse.rewrite(new URL("/site", req.url));
    }

    // Rewrite paths for agency and subaccount
    if (
      url.pathname.startsWith("/agency") ||
      url.pathname.startsWith("/subaccount")
    ) {
      return NextResponse.rewrite(new URL(pathWithSearchParams, req.url));
    }
  },
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
