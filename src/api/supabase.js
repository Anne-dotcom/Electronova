import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create the Supabase client
export const supabase = (() => {
  // During build time or if env vars are missing, return a mock client
  if (typeof window === 'undefined' && (!supabaseUrl || !supabaseAnonKey)) {
    console.warn('Supabase environment variables not found during build. Using build-time fallback.');
    return {
      from: () => ({
        select: () => ({ 
          order: () => Promise.resolve({ data: [], error: null }),
          eq: () => Promise.resolve({ data: [], error: null }),
          single: () => Promise.resolve({ data: null, error: null }),
          limit: () => Promise.resolve({ data: [], error: null }),
          range: () => Promise.resolve({ data: [], error: null }),
          ilike: () => Promise.resolve({ data: [], error: null })
        }),
        insert: () => ({ 
          select: () => ({ 
            single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
          })
        }),
        update: () => ({ 
          eq: () => ({ 
            select: () => ({ 
              single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
            })
          })
        }),
        delete: () => ({ 
          eq: () => Promise.resolve({ error: { message: 'Supabase not configured' } })
        })
      })
    };
  }

  // Runtime validation for client-side
  if (typeof window !== 'undefined') {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Missing Supabase environment variables:', {
        url: !!supabaseUrl,
        key: !!supabaseAnonKey
      });
      throw new Error('Supabase environment variables are not configured properly');
    }
  }

  // Create real Supabase client
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
})();

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