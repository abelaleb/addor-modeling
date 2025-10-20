import DashboardCard from "@/components/dashboard/DashboardCard";
import { FileText, CheckCircle, Users, UserCheck } from "lucide-react";
import { createServerSupabaseClient } from "@/utils/supabase/server";
import ApplicationsTable from "@/components/dashboard/ApplicationsTable";

export default async function AdminDashboard() {
  const supabase = createServerSupabaseClient();

  // Fetch real statistics
  const [
    { count: totalApplications },
    { count: pendingApplications },
    { count: acceptedModels },
    { count: totalUsers }
  ] = await Promise.all([
    supabase.from('model_applications').select('*', { count: 'exact', head: true }),
    supabase.from('model_applications').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('model_applications').select('*', { count: 'exact', head: true }).eq('status', 'accepted'),
    supabase.from('user_roles').select('*', { count: 'exact', head: true })
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Overview of your modeling agency
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Applications"
          count={totalApplications || 0}
          icon={<FileText className="text-black dark:text-white" size={48} />}
        />
        <DashboardCard
          title="Pending Review"
          count={pendingApplications || 0}
          icon={<CheckCircle className="text-black dark:text-white" size={48} />}
        />
        <DashboardCard
          title="Active Models"
          count={acceptedModels || 0}
          icon={<UserCheck className="text-black dark:text-white" size={48} />}
        />
        <DashboardCard
          title="Total Users"
          count={totalUsers || 0}
          icon={<Users className="text-black dark:text-white" size={48} />}
        />
      </div>

      {/* Recent Applications */}
      <ApplicationsTable limit={5} />
    </div>
  );
}
