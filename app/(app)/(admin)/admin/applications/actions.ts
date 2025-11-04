'use server';

import { createServerSupabaseClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateApplicationStatus(formData: FormData) {
  const supabase = createServerSupabaseClient();
  
  const applicationId = formData.get('applicationId') as string;
  const status = formData.get('status') as 'approved' | 'rejected';

  const { error } = await supabase
    .from('model_applications')
    .update({ status })
    .eq('id', applicationId);

  if (error) {
    throw new Error(error.message);
  }

  // If approved, create a model entry
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

      if (modelError) {
        throw new Error(modelError.message);
      }
    }
  }

  revalidatePath('/admin');
  revalidatePath('/admin/applications');
  redirect('/admin/applications');
}
