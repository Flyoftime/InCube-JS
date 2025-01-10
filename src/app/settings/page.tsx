import Settings from "@/components/settings";
import Sidebar from "@/components/sidebar";
import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptionts } from "../api/auth/[...nextauth]/route";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Setting Incube",
  description: "Collect Your Report",
  // other metadata
};

const Settingspage = async () => {
  const session = await getServerSession(authOptionts);
  if (session) {
    return (
      <div className="flex " id="settings">
        <Sidebar username={session.user.username} />
        <Settings />
      </div>
    );
  } else {
    redirect("/login");
  }
};

export default Settingspage;
