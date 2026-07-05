import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import AdminDashboard from "./AdminDashboard";

export default async function AdminPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#07181e] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Admin Dashboard
          </h1>
          <div className="flex gap-4">
            <span className="bg-gray-800 px-4 py-2 rounded-lg text-gray-300">
              Welcome, Admin
            </span>
          </div>
        </div>
        
        <AdminDashboard />
      </div>
    </div>
  );
}
