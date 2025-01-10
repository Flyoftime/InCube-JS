import Dashboard from "@/components/dashboard/dashboard";
import Sidebar from "@/components/sidebar";
import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptionts } from "../api/auth/[...nextauth]/route";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Incube",
  description: "Collect Your Report",
  // other metadata
};

const Dashboardpage = async () => {
  const session = await getServerSession(authOptionts);
  if (session) {
    return (
      <div className="flex">
        <Sidebar username={session.user.username} />
        <Dashboard />
      </div>
    );
  } else {
    redirect("/login");
  }
};

export default Dashboardpage;
