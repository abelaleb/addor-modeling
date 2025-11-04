import { createServerSupabaseClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User, Mail, Phone, MapPin, Instagram, Calendar, Ruler } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ApplicationReviewActions from "./actions-client";

interface ApplicationDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ApplicationDetailPage({ params }: ApplicationDetailPageProps) {
  const supabase = createServerSupabaseClient();

  // Fetch application details
  const { data: application, error } = await supabase
    .from('model_applications')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !application) {
    notFound();
  }

  // Fetch associated photos
  const { data: photos } = await supabase
    .from('model_photos')
    .select('*')
    .eq('application_id', params.id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-800 dark:border-yellow-400';
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-800 dark:border-green-400';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border-red-800 dark:border-red-400';
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/applications">
          <Button variant="outline" size="icon" className="border-2 border-black dark:border-white rounded-none">
            <ArrowLeft size={18} />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">
            {application.first_name} {application.last_name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Application Review</p>
        </div>
        <Badge className={`rounded-none border-2 ${getStatusColor(application.status)}`}>
          {application.status}
        </Badge>
      </div>

      {/* Action Buttons */}
      {application.status === 'pending' && (
        <ApplicationReviewActions applicationId={application.id} />
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card className="border-2 border-black dark:border-white rounded-none">
          <CardHeader className="border-b-2 border-black dark:border-white">
            <CardTitle className="flex items-center gap-2">
              <User size={20} />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">First Name</label>
                <p className="font-medium">{application.first_name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Last Name</label>
                <p className="font-medium">{application.last_name}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Gender</label>
                <p className="font-medium capitalize">{application.gender}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Age</label>
                <p className="font-medium">{calculateAge(application.birth_date)} years</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Birth Date</label>
              <p className="font-medium">{new Date(application.birth_date).toLocaleDateString()}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Eye Color</label>
              <p className="font-medium capitalize">{application.eye_color}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Hair Color</label>
              <p className="font-medium capitalize">{application.hair_color}</p>
            </div>

            {application.about_me && (
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">About</label>
                <p className="font-medium">{application.about_me}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="border-2 border-black dark:border-white rounded-none">
          <CardHeader className="border-b-2 border-black dark:border-white">
            <CardTitle className="flex items-center gap-2">
              <Mail size={20} />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</label>
              <p className="font-medium">{application.email}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Phone</label>
              <p className="font-medium">{application.phone}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Location</label>
              <p className="font-medium">{application.current_location}</p>
            </div>
            
            {application.instagram && (
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Instagram</label>
                <p className="font-medium">@{application.instagram}</p>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Applied On</label>
              <p className="font-medium">{new Date(application.created_at).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>

        {/* Measurements */}
        <Card className="border-2 border-black dark:border-white rounded-none">
          <CardHeader className="border-b-2 border-black dark:border-white">
            <CardTitle className="flex items-center gap-2">
              <Ruler size={20} />
              Measurements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Height</label>
                <p className="font-medium">{application.height} cm</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Waist</label>
                <p className="font-medium">{application.waist} cm</p>
              </div>
            </div>
            
            {application.bust && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Bust</label>
                  <p className="font-medium">{application.bust} cm</p>
                </div>
                {application.cup_size && (
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Cup Size</label>
                    <p className="font-medium">{application.cup_size}</p>
                  </div>
                )}
              </div>
            )}
            
            {application.hips && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Hips</label>
                  <p className="font-medium">{application.hips} cm</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Shoes</label>
                  <p className="font-medium">{application.shoes}</p>
                </div>
              </div>
            )}
            
            {(application.suit || application.inseam) && (
              <div className="grid grid-cols-2 gap-4">
                {application.suit && (
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Suit</label>
                    <p className="font-medium">{application.suit}</p>
                  </div>
                )}
                {application.inseam && (
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Inseam</label>
                    <p className="font-medium">{application.inseam} cm</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Photos */}
        {photos && photos.length > 0 && (
          <Card className="border-2 border-black dark:border-white rounded-none lg:col-span-2">
            <CardHeader className="border-b-2 border-black dark:border-white">
              <CardTitle>Photos</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {photos.map((photo) => (
                  <div key={photo.id} className="space-y-2">
                    <div className="relative aspect-[3/4] w-full">
                      <Image
                        src={photo.photo_url}
                        alt={photo.photo_type || 'Model photo'}
                        fill
                        className="border-2 border-black dark:border-white rounded-none object-cover"
                      />
                    </div>
                    <p className="text-sm font-medium capitalize text-center">
                      {photo.photo_type?.replace('_', ' ')}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
