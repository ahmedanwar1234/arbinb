import { getServerSession } from "next-auth";
import { authOptions } from "@/app/libs/authOptions"; // ✅
import prisma from "../libs/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email as string },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: new Date(currentUser.createdAt),
      updatedAt: new Date(currentUser.updatedAt),
      emailVerified: currentUser.emailVerified
        ? new Date(currentUser.emailVerified)
        : null,
    };
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
}
