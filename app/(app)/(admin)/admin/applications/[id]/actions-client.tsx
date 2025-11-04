"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";

interface ApplicationReviewActionsProps {
  applicationId: string;
}

export default function ApplicationReviewActions({ applicationId }: ApplicationReviewActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  const handleStatusUpdate = async (status: 'approved' | 'rejected') => {
    setIsLoading(true);
    try {
      // Update application status
      const { error: updateError } = await supabase
        .from('model_applications')
        .update({ status })
        .eq('id', applicationId);

      if (updateError) throw updateError;

      // If approved, create model entry
      if (status === 'approved') {
        const { data: application } = await supabase
          .from('model_applications')
          .select('*')
          .eq('id', applicationId)
          .single();

        if (application) {
          const { error: modelError } = await supabase
            .from('models')
            .insert({
              user_id: application.user_id,
              gender: application.gender,
              first_name: application.first_name,
              last_name: application.last_name,
              email: application.email,
              phone: application.phone,
              current_location: application.current_location,
              instagram: application.instagram,
              birth_date: application.birth_date,
              height: application.height,
              cup_size: application.cup_size,
              hips: application.hips,
              waist: application.waist,
              bust: application.bust,
              suit: application.suit,
              suit_length: application.suit_length,
              inseam: application.inseam,
              shoes: application.shoes,
              eye_color: application.eye_color,
              hair_color: application.hair_color,
              about_me: application.about_me,
              status: 'active'
            });

          if (modelError) throw modelError;
        }
      }

      // Redirect back to applications page
      router.push('/admin/applications');
      router.refresh();
    } catch (error) {
      console.error('Error updating application:', error);
      alert('Failed to update application. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-4">
      <Button 
        onClick={() => handleStatusUpdate('approved')}
        disabled={isLoading}
        className="bg-green-600 hover:bg-green-700 text-white border-2 border-green-600 rounded-none"
      >
        {isLoading ? 'Processing...' : 'Approve Application'}
      </Button>
      <Button 
        onClick={() => handleStatusUpdate('rejected')}
        disabled={isLoading}
        variant="outline"
        className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-none"
      >
        {isLoading ? 'Processing...' : 'Reject Application'}
      </Button>
    </div>
  );
}
