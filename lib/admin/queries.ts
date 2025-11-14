import { createServerSupabaseClient } from '@/utils/supabase/server';
import type { DashboardStats, ModelApplication, Model, User } from '@/types/database';

// Check if current user is admin
export async function isUserAdmin(): Promise<boolean> {
  const supabase = await createServerSupabaseClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return false;
  
  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();
  
  return userData?.role === 'admin';
}

// Get dashboard statistics
export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createServerSupabaseClient();
  
  const [
    { count: totalApplications },
    { count: pendingReviews },
    { count: activeModels },
    { count: totalUsers }
  ] = await Promise.all([
    supabase.from('model_applications').select('*', { count: 'exact', head: true }),
    supabase.from('model_applications').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('models').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('users').select('*', { count: 'exact', head: true })
  ]);
  
  return {
    totalApplications: totalApplications || 0,
    pendingReviews: pendingReviews || 0,
    activeModels: activeModels || 0,
    totalUsers: totalUsers || 0
  };
}

// Get all model applications with optional status filter
export async function getModelApplications(status?: 'pending' | 'approved' | 'rejected'): Promise<ModelApplication[]> {
  const supabase = await createServerSupabaseClient();
  
  let query = supabase
    .from('model_applications')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (status) {
    query = query.eq('status', status);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  
  return data || [];
}

// Get single application by ID
export async function getApplicationById(id: string): Promise<ModelApplication | null> {
  const supabase = await createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('model_applications')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  
  return data;
}

// Get all models
export async function getModels(status?: 'active' | 'inactive' | 'archived'): Promise<Model[]> {
  const supabase = await createServerSupabaseClient();
  
  let query = supabase
    .from('models')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (status) {
    query = query.eq('status', status);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  
  return data || [];
}

// Get all users
export async function getAllUsers(): Promise<User[]> {
  const supabase = await createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  
  return data || [];
}

// Get recent applications for dashboard
export async function getRecentApplications(limit: number = 10): Promise<ModelApplication[]> {
  const supabase = await createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('model_applications')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  
  return data || [];
}

// Get photos for an application
export async function getApplicationPhotos(applicationId: string) {
  const supabase = await createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('model_photos')
    .select('*')
    .eq('application_id', applicationId);
  
  if (error) throw error;
  
  return data || [];
}
