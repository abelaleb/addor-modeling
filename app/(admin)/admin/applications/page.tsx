import { Suspense } from "react";
import { createServerSupabaseClient } from "@/utils/supabase/server";
import ApplicationsTable from "@/components/dashboard/ApplicationsTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";

async function ApplicationsStats() {
  const supabase = createServerSupabaseClient();

  const [
    { count: totalApplications },
    { count: pendingApplications },
    { count: approvedApplications },
    { count: rejectedApplications }
  ] = await Promise.all([
    supabase.from('model_applications').select('*', { count: 'exact', head: true }),
    supabase.from('model_applications').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('model_applications').select('*', { count: 'exact', head: true }).eq('status', 'approved'),
    supabase.from('model_applications').select('*', { count: 'exact', head: true }).eq('status', 'rejected')
  ]);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="border-2 border-black dark:border-white rounded-none p-4 bg-white dark:bg-black">
        <div className="flex items-center gap-3">
          <FileText size={24} />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
            <p className="text-2xl font-bold">{totalApplications || 0}</p>
          </div>
        </div>
      </div>
      
      <div className="border-2 border-black dark:border-white rounded-none p-4 bg-white dark:bg-black">
        <div className="flex items-center gap-3">
          <Clock size={24} className="text-yellow-600" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
            <p className="text-2xl font-bold">{pendingApplications || 0}</p>
          </div>
        </div>
      </div>
      
      <div className="border-2 border-black dark:border-white rounded-none p-4 bg-white dark:bg-black">
        <div className="flex items-center gap-3">
          <CheckCircle size={24} className="text-green-600" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Approved</p>
            <p className="text-2xl font-bold">{approvedApplications || 0}</p>
          </div>
        </div>
      </div>
      
      <div className="border-2 border-black dark:border-white rounded-none p-4 bg-white dark:bg-black">
        <div className="flex items-center gap-3">
          <XCircle size={24} className="text-red-600" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Rejected</p>
            <p className="text-2xl font-bold">{rejectedApplications || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ApplicationsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Applications</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Review and manage model applications
          </p>
        </div>
      </div>

      <Suspense fallback={<div>Loading stats...</div>}>
        <ApplicationsStats />
      </Suspense>

      <Suspense fallback={<div>Loading applications...</div>}>
        <ApplicationsTable />
      </Suspense>
    </div>
  );
}
