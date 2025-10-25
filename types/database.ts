export type User = {
  id: string;
  role: 'admin' | 'client';
  created_at: string;
};

export type Model = {
  id: string;
  user_id: string | null;
  gender: 'male' | 'female';
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  current_location: string;
  instagram: string | null;
  birth_date: string;
  height: number;
  cup_size: number | null;
  hips: number | null;
  waist: number;
  bust: number | null;
  suit: number | null;
  suit_length: number | null;
  inseam: number | null;
  shoes: number;
  eye_color: string;
  hair_color: string;
  about_me: string | null;
  status: 'active' | 'inactive' | 'archived';
  joined_at: string;
  created_at: string;
};

export type ModelApplication = {
  id: string;
  user_id: string | null;
  gender: 'male' | 'female';
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  current_location: string;
  instagram: string | null;
  birth_date: string;
  height: number;
  cup_size: number | null;
  hips: number | null;
  waist: number;
  bust: number | null;
  suit: number | null;
  suit_length: number | null;
  inseam: number | null;
  shoes: number;
  eye_color: string;
  hair_color: string;
  about_me: string | null;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
};

export type ModelPhoto = {
  id: string;
  application_id: string | null;
  photo_type: 'close_up' | 'side' | 'upper_body' | 'eyes' | 'full_length' | null;
  photo_url: string;
  uploaded_at: string;
};

export type DashboardStats = {
  totalApplications: number;
  pendingReviews: number;
  activeModels: number;
  totalUsers: number;
};
