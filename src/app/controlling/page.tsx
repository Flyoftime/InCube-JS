import Sidebar from "@/components/sidebar";
import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptionts } from "../api/auth/[...nextauth]/route";
import { Metadata } from "next";
import Control from "@/components/control/Control";

export const metadata: Metadata = {
  title: "Controlling Incube",
  description: "Collect Your Report",
  // other metadata
};

const ReportsPage = async () => {
  const session = await getServerSession(authOptionts);
  if (session) {
    return (
      <div className="flex">
        <Sidebar username={session.user.username} />
        <Control />
      </div>
    );
  } else {
    redirect("/login");
  }
};

export default ReportsPage;
