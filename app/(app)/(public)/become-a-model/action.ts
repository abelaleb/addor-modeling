"use server";

import { createAdminClient } from '@/utils/supabase/admin';
import { revalidatePath } from 'next/cache';

export async function submitModelApplication(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('🚀 Server action started');
    
    // Create admin client
    const supabase = createAdminClient();
    console.log('✅ Supabase admin client created');

    // Extract form data
    const applicationData = {
      first_name: formData.get('firstName') as string,
      last_name: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      current_location: formData.get('currentLocation') as string,
      instagram: formData.get('instagram') as string,
      birth_date: formData.get('birthDate') as string,
      height: formData.get('height') as string,
      gender: formData.get('gender') as string,
      // Male specific fields
      suit: formData.get('suit') as string,
      suit_length: formData.get('suitLength') as string,
      waist: formData.get('waist') as string,
      inseam: formData.get('inseam') as string,
      // Female specific fields
      cup_size: formData.get('cupSize') as string,
      hips: formData.get('hips') as string,
      bust: formData.get('bust') as string,
      // Common fields
      shoes: formData.get('shoes') as string,
      eye_color: formData.get('eyeColor') as string,
      hair_color: formData.get('hairColor') as string,
      about_me: formData.get('aboutMe') as string,
      status: 'pending'
    };

    console.log('📝 Application data prepared for:', applicationData.email);

    // Step 1: Insert application into database
    const { data: application, error: appError } = await supabase
      .from('model_applications')
      .insert([applicationData])
      .select()
      .single();

    if (appError) {
      console.error('❌ Database insert error:', appError);
      return { success: false, error: `Database error: ${appError.message}` };
    }

    console.log('✅ Application created with ID:', application.id);

    // Step 2: Handle photo uploads
    const photoTypes = ['closeUp', 'side', 'upperBody', 'eyes', 'fullLength'];
    let uploadedPhotos = 0;

    for (const photoType of photoTypes) {
      const file = formData.get(photoType) as File;
      
      if (file && file.size > 0) {
        console.log(`📸 Uploading ${photoType}: ${file.name} (${file.size} bytes)`);
        
        // Create unique filename
        const fileExtension = file.name.split('.').pop();
        const fileName = `${application.id}/${photoType}-${Date.now()}.${fileExtension}`;
        
        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('model-photos')
          .upload(fileName, file, {
            contentType: file.type,
            upsert: false
          });

        if (uploadError) {
          console.error(`❌ Upload error for ${photoType}:`, uploadError);
          // Continue with other photos even if one fails
          continue;
        }

        console.log(`✅ ${photoType} uploaded successfully`);

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('model-photos')
          .getPublicUrl(fileName);

        // Insert photo record into database
        const { error: photoDbError } = await supabase
          .from('model_photos')
          .insert({
            application_id: application.id,
            photo_url: publicUrl,
            photo_type: photoType
          });

        if (photoDbError) {
          console.error(`❌ Photo DB insert error for ${photoType}:`, photoDbError);
        } else {
          uploadedPhotos++;
          console.log(`✅ ${photoType} record saved to database`);
        }
      }
    }

    console.log(`📊 Total photos uploaded: ${uploadedPhotos}`);

    // Revalidate the page
    revalidatePath('/become-a-model');

    return { 
      success: true
    };

  } catch (error: any) {
    console.error('❌ Server action error:', error);
    return { 
      success: false, 
      error: error.message || 'An unexpected error occurred. Please try again.' 
    };
  }
}
