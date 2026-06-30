import { redirect } from "react-router-dom";

export async function AuthLoader() {
    const isAuthenticated = false; // replace with your real auth check

    if (!isAuthenticated) {
        throw redirect("/login");
    }

    // You can return user/session data here if needed
    return null;
}