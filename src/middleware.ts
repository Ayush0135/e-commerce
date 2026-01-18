import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
    "/",
    "/shop(.*)",
    "/products(.*)",
    "/collections(.*)",
    "/craftsmanship(.*)",
    "/about(.*)",
    "/contact(.*)",
    "/cart(.*)",
    "/checkout(.*)",
    "/tracking(.*)",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/admin(.*)", // Handled manually
]);

export default clerkMiddleware(async (auth, request) => {
    // Custom Admin Protection
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // Allow access to login page
        if (request.nextUrl.pathname === '/admin/login') {
            return;
        }

        // Check for admin_session cookie
        const adminSession = request.cookies.get('admin_session');
        if (!adminSession) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    // Clerk Protection for other routes
    if (!isPublicRoute(request) && !request.nextUrl.pathname.startsWith('/admin')) {
        await auth.protect();
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
