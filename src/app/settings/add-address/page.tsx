// ProfilePage.tsx
import React from "react";
import { getServerSession } from "next-auth";
import { authOptionts } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import SaveAddressForm from "@/components/setting/save-address";
import Sidebar from "@/components/sidebar";

export const metadata: Metadata = {
  title: "Profile Incube",
  description: "Add address information",
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
      <SaveAddressForm></SaveAddressForm>
    </div>
  );
};

export default ProfilePage;
