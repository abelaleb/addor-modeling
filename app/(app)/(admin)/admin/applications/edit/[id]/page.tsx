import { createServerSupabaseClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";
import ApplicationReviewForm from "@/components/dashboard/ApplicationReviewForm";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface ApplicationDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ApplicationDetailPage({ params }: ApplicationDetailPageProps) {
  const supabase = await createServerSupabaseClient();

  // Fetch application
  const { data: application, error: appError } = await supabase
    .from('model_applications')
    .select('*')
    .eq('id', params.id)
    .single();

  if (appError || !application) {
    notFound();
  }

  // Fetch photos
  const { data: photos } = await supabase
    .from('model_photos')
    .select('*')
    .eq('application_id', params.id);

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
    <div className="space-y-6">
      <BackButton text="Back to Applications" link="/admin/applications" />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            {application.first_name} {application.last_name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Application ID: {application.id}
          </p>
        </div>
        <Badge 
          variant="outline" 
          className={`rounded-none border-2 text-lg px-4 py-2 ${getStatusColor(application.status)}`}
        >
          {application.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="border-2 border-black dark:border-white rounded-none bg-white dark:bg-black p-6">
            <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <InfoField label="First Name" value={application.first_name} />
              <InfoField label="Last Name" value={application.last_name} />
              <InfoField label="Email" value={application.email} />
              <InfoField label="Phone" value={application.phone} />
              <InfoField label="Location" value={application.current_location} />
              <InfoField label="Instagram" value={application.instagram} />
              <InfoField label="Birth Date" value={application.birth_date} />
              <InfoField label="Gender" value={application.gender} />
            </div>
          </div>

          {/* Measurements */}
          <div className="border-2 border-black dark:border-white rounded-none bg-white dark:bg-black p-6">
            <h2 className="text-2xl font-bold mb-4">Measurements</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <InfoField label="Height" value={`${application.height} cm`} />
              <InfoField label="Waist" value={`${application.waist} cm`} />
              <InfoField label="Shoes" value={application.shoes} />
              <InfoField label="Eye Color" value={application.eye_color} />
              <InfoField label="Hair Color" value={application.hair_color} />
              
              {application.gender === 'female' && (
                <>
                  <InfoField label="Bust" value={`${application.bust} cm`} />
                  <InfoField label="Hips" value={`${application.hips} cm`} />
                  <InfoField label="Cup Size" value={application.cup_size} />
                </>
              )}
              
              {application.gender === 'male' && (
                <>
                  <InfoField label="Suit" value={application.suit} />
                  <InfoField label="Suit Length" value={application.suit_length} />
                  <InfoField label="Inseam" value={`${application.inseam} cm`} />
                </>
              )}
            </div>
          </div>

          {/* About */}
          {application.about_me && (
            <div className="border-2 border-black dark:border-white rounded-none bg-white dark:bg-black p-6">
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-gray-700 dark:text-gray-300">{application.about_me}</p>
            </div>
          )}

          {/* Photos */}
          {photos && photos.length > 0 && (
            <div className="border-2 border-black dark:border-white rounded-none bg-white dark:bg-black p-6">
              <h2 className="text-2xl font-bold mb-4">Photos</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {photos.map((photo) => (
                  <div key={photo.id} className="border-2 border-black dark:border-white">
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={photo.photo_url}
                        alt={photo.photo_type}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-2 bg-black dark:bg-white text-white dark:text-black text-center text-sm font-medium uppercase">
                      {photo.photo_type}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Review Form */}
        <div className="lg:col-span-1">
          <ApplicationReviewForm application={application} />
        </div>
      </div>
    </div>
  );
}

function InfoField({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <dt className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
        {label}
      </dt>
      <dd className="mt-1 text-lg font-semibold">
        {value || 'N/A'}
      </dd>
    </div>
  );
}
