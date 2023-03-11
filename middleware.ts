export { default } from "next-auth/middleware";
export const config = {
  matcher: ["/home", "/search", "/profile", "/profile/editProfile", "/profile/lessonsCards"],
};
