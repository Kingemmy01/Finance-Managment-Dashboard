// src/app/utils/auth.ts
import { account } from "@/lib/appwrite";

export async function logout() {
  try {
    await account.deleteSession("current"); // Deletes current session
    return true;
  } catch (error) {
    console.error("Logout failed:", error);
    return false;
  }
}
