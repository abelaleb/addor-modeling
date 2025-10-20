import BackButton from "@/components/BackButton";
import ApplicationsTable from "@/components/dashboard/ApplicationsTable";
import { createServerSupabaseClient } from "@/utils/supabase/server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function ApplicationsPage() {
  const supabase = createServerSupabaseClient();

  // Get counts for each status
  const [
    { count: pendingCount },
    { count: acceptedCount },
    { count: rejectedCount }
  ] = await Promise.all([
    supabase.from('model_applications').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('model_applications').select('*', { count: 'exact', head: true }).eq('status', 'accepted'),
    supabase.from('model_applications').select('*', { count: 'exact', head: true }).eq('status', 'rejected')
  ]);

  return (
    <div className="space-y-6">
      <BackButton text="Back to Dashboard" link="/admin" />
      
      <div>
        <h1 className="text-4xl font-bold mb-2">Model Applications</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Review and manage model applications
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="border-2 border-black dark:border-white rounded-none bg-white dark:bg-black">
          <TabsTrigger value="all" className="data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black rounded-none">
            All Applications
          </TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black rounded-none">
            Pending ({pendingCount || 0})
          </TabsTrigger>
          <TabsTrigger value="accepted" className="data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black rounded-none">
            Accepted ({acceptedCount || 0})
          </TabsTrigger>
          <TabsTrigger value="rejected" className="data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black rounded-none">
            Rejected ({rejectedCount || 0})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <ApplicationsTable />
        </TabsContent>
        <TabsContent value="pending" className="mt-6">
          <ApplicationsTableFiltered status="pending" />
        </TabsContent>
        <TabsContent value="accepted" className="mt-6">
          <ApplicationsTableFiltered status="accepted" />
        </TabsContent>
        <TabsContent value="rejected" className="mt-6">
          <ApplicationsTableFiltered status="rejected" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Filtered table component
async function ApplicationsTableFiltered({ status }: { status: string }) {
  const supabase = createServerSupabaseClient();

  const { data: applications, error } = await supabase
    .from('model_applications')
    .select('*')
    .eq('status', status)
    .order('created_at', { ascending: false });

  if (error) {
    return <div>Error loading applications</div>;
  }

  return <ApplicationsTable />;
}
