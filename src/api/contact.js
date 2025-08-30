import { supabase } from './supabase.js';

/**
 * Submit a contact message
 * @param {Object} messageData - Contact message information
 * @param {string} messageData.name - Sender's name
 * @param {string} messageData.email - Sender's email
 * @param {string} messageData.message - Message content
 * @returns {Promise<{data: Object|null, error: Object|null}>}
 */
export const submitContactMessage = async (messageData) => {
  try {
    const { name, email, message } = messageData;

    if (!name || !email || !message) {
      return {
        data: null,
        error: { message: 'Name, email, and message are required fields' }
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        data: null,
        error: { message: 'Please provide a valid email address' }
      };
    }

    const { data, error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          message: message.trim()
        }
      ])
      .select(); // ✅ works in v2

    if (error) {
      console.error('Error submitting contact message:', error);
      return { data: null, error };
    }

    // return just the inserted row
    return { data: data?.[0] ?? null, error: null };
  } catch (err) {
    console.error('Unexpected error submitting contact message:', err);
    return { data: null, error: err };
  }
};

/**
 * Get all contact messages (for admin purposes)
 * @param {Object} options - Query options
 * @param {number} options.limit - Limit number of results
 * @param {number} options.offset - Offset for pagination
 * @returns {Promise<{data: Array|null, error: Object|null}>}
 */
export const getAllContactMessages = async (options = {}) => {
  try {
    const { limit = 50, offset = 0 } = options;

    let query = supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    if (offset) {
      query = query.range(offset, offset + limit - 1);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching contact messages:', error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err) {
    console.error('Unexpected error fetching contact messages:', err);
    return { data: null, error: err };
  }
};

/**
 * Get contact messages by email
 * @param {string} email - Email to search for
 * @returns {Promise<{data: Array|null, error: Object|null}>}
 */
export const getContactMessagesByEmail = async (email) => {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .eq('email', email.toLowerCase())
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching contact messages by email:', error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err) {
    console.error('Unexpected error fetching contact messages by email:', err);
    return { data: null, error: err };
  }
};

/**
 * Delete a contact message (for admin purposes)
 * @param {number} messageId - The ID of the message to delete
 * @returns {Promise<{success: boolean, error: Object|null}>}
 */
export const deleteContactMessage = async (messageId) => {
  try {
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', messageId);

    if (error) {
      console.error('Error deleting contact message:', error);
      return { success: false, error };
    }

    return { success: true, error: null };
  } catch (err) {
    console.error('Unexpected error deleting contact message:', err);
    return { success: false, error: err };
  }
};