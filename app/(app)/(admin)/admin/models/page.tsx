import { createServerSupabaseClient } from "@/utils/supabase/server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserCheck, Users, UserX, Archive } from "lucide-react";
import { Suspense } from "react";

async function ModelsStats() {
  const supabase = await createServerSupabaseClient();

  const [
    { count: totalModels },
    { count: activeModels },
    { count: inactiveModels },
    { count: archivedModels }
  ] = await Promise.all([
    supabase.from('models').select('*', { count: 'exact', head: true }),
    supabase.from('models').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('models').select('*', { count: 'exact', head: true }).eq('status', 'inactive'),
    supabase.from('models').select('*', { count: 'exact', head: true }).eq('status', 'archived')
  ]);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="border-2 border-black dark:border-white rounded-none p-4 bg-white dark:bg-black">
        <div className="flex items-center gap-3">
          <Users size={24} />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
            <p className="text-2xl font-bold">{totalModels || 0}</p>
          </div>
        </div>
      </div>
      
      <div className="border-2 border-black dark:border-white rounded-none p-4 bg-white dark:bg-black">
        <div className="flex items-center gap-3">
          <UserCheck size={24} className="text-green-600" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
            <p className="text-2xl font-bold">{activeModels || 0}</p>
          </div>
        </div>
      </div>
      
      <div className="border-2 border-black dark:border-white rounded-none p-4 bg-white dark:bg-black">
        <div className="flex items-center gap-3">
          <UserX size={24} className="text-red-600" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Inactive</p>
            <p className="text-2xl font-bold">{inactiveModels || 0}</p>
          </div>
        </div>
      </div>
      
      <div className="border-2 border-black dark:border-white rounded-none p-4 bg-white dark:bg-black">
        <div className="flex items-center gap-3">
          <Archive size={24} className="text-gray-600" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Archived</p>
            <p className="text-2xl font-bold">{archivedModels || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

async function ModelsTable() {
  const supabase = await createServerSupabaseClient();

  const { data: models, error } = await supabase
    .from('models')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return <div>Error loading models</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-800 dark:border-green-400';
      case 'inactive':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border-red-800 dark:border-red-400';
      case 'archived':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400 border-gray-800 dark:border-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400 border-gray-800 dark:border-gray-400';
    }
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="border-2 border-black dark:border-white rounded-none bg-white dark:bg-black">
      <div className="p-6 border-b-2 border-black dark:border-white">
        <h2 className="text-2xl font-bold">All Models</h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-b-2 border-black dark:border-white hover:bg-gray-50 dark:hover:bg-gray-900">
            <TableHead className="font-bold">Name</TableHead>
            <TableHead className="font-bold">Email</TableHead>
            <TableHead className="font-bold">Gender</TableHead>
            <TableHead className="font-bold">Age</TableHead>
            <TableHead className="font-bold">Height</TableHead>
            <TableHead className="font-bold">Location</TableHead>
            <TableHead className="font-bold">Status</TableHead>
            <TableHead className="font-bold">Joined</TableHead>
            <TableHead className="font-bold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {models && models.length > 0 ? (
            models.map((model) => (
              <TableRow 
                key={model.id}
                className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <TableCell className="font-medium">
                  {model.first_name} {model.last_name}
                </TableCell>
                <TableCell>{model.email}</TableCell>
                <TableCell className="capitalize">{model.gender}</TableCell>
                <TableCell>{calculateAge(model.birth_date)}</TableCell>
                <TableCell>{model.height} cm</TableCell>
                <TableCell>{model.current_location}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={`rounded-none border-2 ${getStatusColor(model.status)}`}
                  >
                    {model.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(model.joined_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    size="sm"
                    variant="outline"
                    className="border-2 border-black dark:border-white rounded-none"
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                No models found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default function ModelsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Models</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your active models
        </p>
      </div>

      <Suspense fallback={<div>Loading stats...</div>}>
        <ModelsStats />
      </Suspense>

      <Suspense fallback={<div>Loading models...</div>}>
        <ModelsTable />
      </Suspense>
    </div>
  );
}
