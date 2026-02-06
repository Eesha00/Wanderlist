import { auth } from "@/lib/auth"
 
export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnDashboard = req.nextUrl.pathname.startsWith('/dashboard')
  const isOnAuth = req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register')
 
  // If trying to access dashboard but not logged in, kick to login
  if (isOnDashboard && !isLoggedIn) {
    return Response.redirect(new URL('/login', req.nextUrl))
  }
 
  // If already logged in and trying to login/register, send to dashboard
  if (isOnAuth && isLoggedIn) {
    return Response.redirect(new URL('/dashboard', req.nextUrl))
  }
})
 
// Don't invoke Middleware on these paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}