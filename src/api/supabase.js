import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a fallback client for build time (when env vars might not be available)
let supabase;

if (supabaseUrl && supabaseAnonKey) {
  // Production/development with proper env vars
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      // Disable auth for public e-commerce functionality
      autoRefreshToken: false,
      persistSession: false
    }
  });
} else {
  // Build time fallback - create a mock client
  console.warn('Supabase environment variables not found. Using fallback for build.');
  supabase = {
    from: () => ({
      select: () => Promise.resolve({ data: [], error: null }),
      insert: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      update: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      delete: () => Promise.resolve({ error: { message: 'Supabase not configured' } })
    })
  };
}

export { supabase };

// Optional: Helper function to test connection
export const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('Supabase connection test failed:', error);
      return { connected: false, error };
    }
    
    console.log('Supabase connected successfully. Products count:', data);
    return { connected: true, error: null };
  } catch (err) {
    console.error('Supabase connection error:', err);
    return { connected: false, error: err };
  }
};