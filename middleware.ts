export { default } from "next-auth/middleware";
export const config = {
  matcher: ["/home", "/profile", "/profile/editProfile", "/profile/lessonsCards"],
};
