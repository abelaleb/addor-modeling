"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ApplicationReviewFormProps {
  application: any;
}

export default function ApplicationReviewForm({ application }: ApplicationReviewFormProps) {
  const [notes, setNotes] = useState(application.admin_notes || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();
  const { toast } = useToast();

  const updateStatus = async (newStatus: 'accepted' | 'rejected') => {
    setIsUpdating(true);

    try {
      const { error } = await supabase
        .from('model_applications')
        .update({ 
          status: newStatus,
          admin_notes: notes,
          updated_at: new Date().toISOString()
        })
        .eq('id', application.id);

      if (error) throw error;

      toast({
        title: "Application Updated",
        description: `Application has been ${newStatus}.`,
      });

      router.refresh();
    } catch (error) {
      console.error('Error updating application:', error);
      toast({
        title: "Error",
        description: "Failed to update application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const saveNotes = async () => {
    setIsUpdating(true);

    try {
      const { error } = await supabase
        .from('model_applications')
        .update({ 
          admin_notes: notes,
          updated_at: new Date().toISOString()
        })
        .eq('id', application.id);

      if (error) throw error;

      toast({
        title: "Notes Saved",
        description: "Admin notes have been updated.",
      });

      router.refresh();
    } catch (error) {
      console.error('Error saving notes:', error);
      toast({
        title: "Error",
        description: "Failed to save notes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="border-2 border-black dark:border-white rounded-none bg-white dark:bg-black p-6 sticky top-6">
      <h2 className="text-2xl font-bold mb-4">Review Actions</h2>

      {/* Admin Notes */}
      <div className="space-y-2 mb-6">
        <Label htmlFor="notes">Admin Notes</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add internal notes about this application..."
          className="min-h-[120px] border-2 border-black dark:border-white rounded-none"
          disabled={isUpdating}
        />
        <Button
          onClick={saveNotes}
          variant="outline"
          className="w-full border-2 border-black dark:border-white rounded-none"
          disabled={isUpdating}
        >
          {isUpdating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Notes'
          )}
        </Button>
      </div>

      {/* Status Actions */}
      {application.status === 'pending' && (
        <div className="space-y-3">
          <Button
            onClick={() => updateStatus('accepted')}
            className="w-full bg-green-600 hover:bg-green-700 text-white border-2 border-green-600 rounded-none"
            disabled={isUpdating}
          >
            <CheckCircle className="mr-2 h-5 w-5" />
            Accept Application
          </Button>
          <Button
            onClick={() => updateStatus('rejected')}
            className="w-full bg-red-600 hover:bg-red-700 text-white border-2 border-red-600 rounded-none"
            disabled={isUpdating}
          >
            <XCircle className="mr-2 h-5 w-5" />
            Reject Application
          </Button>
        </div>
      )}

      {application.status !== 'pending' && (
        <div className="p-4 border-2 border-black dark:border-white bg-gray-50 dark:bg-gray-900">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This application has been <strong className="capitalize">{application.status}</strong>.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            Updated: {new Date(application.updated_at).toLocaleString()}
          </p>
        </div>
      )}

      {/* Application Info */}
      <div className="mt-6 pt-6 border-t-2 border-black dark:border-white space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Submitted:</span>
          <span className="font-medium">{new Date(application.created_at).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Application ID:</span>
          <span className="font-mono text-xs">{application.id.slice(0, 8)}...</span>
        </div>
      </div>
    </div>
  );
}
