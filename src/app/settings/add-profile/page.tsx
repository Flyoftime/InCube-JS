// ProfilePage.tsx
import React from "react";
import { getServerSession } from "next-auth";
import { authOptionts } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import Sidebar from "@/components/sidebar";
import SaveProfileForm from "@/components/setting/save-profile";

export const metadata: Metadata = {
  title: "Profile Incube",
  description: "Add Profile information",
  // other metadata
};

const ProfilePage: React.FC = async () => {
  const session = await getServerSession(authOptionts);
  if (!session) {
    // Redirect jika sesi tidak ditemukan
    redirect("/login");
    return null;
  }
  return (
    <div className="flex">
      <Sidebar username={session.user.username}></Sidebar>
      <SaveProfileForm></SaveProfileForm>
    </div>
  );
};

export default ProfilePage;
