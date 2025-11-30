import { mainMiddleware, middlewareConfig } from './middleware/mainMiddleware'; 

export { mainMiddleware as middleware };


export const config = {
  matcher: [
    '/',
    '/login/:path*',
  ],
};