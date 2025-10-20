import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createServerSupabaseClient } from "@/utils/supabase/server";
import { Badge } from "@/components/ui/badge";

interface ApplicationsTableProps {
  limit?: number;
}

export default async function ApplicationsTable({ limit }: ApplicationsTableProps) {
  const supabase = createServerSupabaseClient();

  let query = supabase
    .from('model_applications')
    .select('*')
    .order('created_at', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data: applications, error } = await query;

  if (error) {
    console.error('Error fetching applications:', error);
    return <div>Error loading applications</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800 border-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-800';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-800';
    }
  };

  return (
    <div className="border-2 border-black dark:border-white rounded-none bg-white dark:bg-black">
      <div className="p-6 border-b-2 border-black dark:border-white">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {limit ? 'Recent Applications' : 'All Applications'}
          </h2>
          {limit && (
            <Link href="/admin/applications">
              <Button variant="outline" className="border-2 border-black dark:border-white rounded-none">
                View All
              </Button>
            </Link>
          )}
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-b-2 border-black dark:border-white hover:bg-gray-50 dark:hover:bg-gray-900">
            <TableHead className="font-bold">Name</TableHead>
            <TableHead className="font-bold">Email</TableHead>
            <TableHead className="font-bold">Gender</TableHead>
            <TableHead className="font-bold">Status</TableHead>
            <TableHead className="font-bold">Date</TableHead>
            <TableHead className="font-bold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications && applications.length > 0 ? (
            applications.map((application) => (
              <TableRow 
                key={application.id}
                className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <TableCell className="font-medium">
                  {application.first_name} {application.last_name}
                </TableCell>
                <TableCell>{application.email}</TableCell>
                <TableCell className="capitalize">{application.gender}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={`rounded-none border-2 ${getStatusColor(application.status)}`}
                  >
                    {application.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(application.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/admin/applications/${application.id}`}>
                    <Button 
                      size="sm"
                      className="bg-black text-white dark:bg-white dark:text-black border-2 border-black dark:border-white rounded-none hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
                    >
                      Review
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                No applications found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
