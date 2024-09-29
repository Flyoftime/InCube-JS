import Report from "@/components/Report";
import Sidebar from "@/components/sidebar";
import React from "react";
import { redirect, useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptionts } from "../api/auth/[...nextauth]/route";

const ReportsPage = async () => {
  const session = await getServerSession(authOptionts);
  if (!session) {
    return redirect("/login");
  }
  return (
    <div className="flex">
      <Sidebar />
      <Report />
    </div>
  );
};

export default ReportsPage;
