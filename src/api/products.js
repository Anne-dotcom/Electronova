import { supabase } from './supabase.js';

/**
 * Fetch all products from the database
 * @returns {Promise<{data: Array, error: Object|null}>}
 */
export const getAllProducts = async () => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err) {
    console.error('Unexpected error fetching products:', err);
    return { data: null, error: err };
  }
};

/**
 * Fetch a single product by ID
 * @param {number} productId - The ID of the product to fetch
 * @returns {Promise<{data: Object|null, error: Object|null}>}
 */
export const getProductById = async (productId) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err) {
    console.error('Unexpected error fetching product:', err);
    return { data: null, error: err };
  }
};

/**
 * Add a new product to the database
 * @param {Object} productData - Product information
 * @param {string} productData.name - Product name
 * @param {number} productData.price - Product price (in cents/paise)
 * @param {string} productData.image - Product image URL
 * @returns {Promise<{data: Object|null, error: Object|null}>}
 */
export const addProduct = async (productData) => {
  try {
    const { name, price, image } = productData;

    // Validate required fields
    if (!name || !price) {
      return { 
        data: null, 
        error: { message: 'Name and price are required fields' } 
      };
    }

    const { data, error } = await supabase
      .from('products')
      .insert([
        {
          name: name.trim(),
          price: Number(price),
          image: image || null
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error adding product:', error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err) {
    console.error('Unexpected error adding product:', err);
    return { data: null, error: err };
  }
};

/**
 * Update an existing product
 * @param {number} productId - The ID of the product to update
 * @param {Object} updateData - Updated product information
 * @returns {Promise<{data: Object|null, error: Object|null}>}
 */
export const updateProduct = async (productId, updateData) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', productId)
      .select()
      .single();

    if (error) {
      console.error('Error updating product:', error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err) {
    console.error('Unexpected error updating product:', err);
    return { data: null, error: err };
  }
};

/**
 * Delete a product from the database
 * @param {number} productId - The ID of the product to delete
 * @returns {Promise<{success: boolean, error: Object|null}>}
 */
export const deleteProduct = async (productId) => {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) {
      console.error('Error deleting product:', error);
      return { success: false, error };
    }

    return { success: true, error: null };
  } catch (err) {
    console.error('Unexpected error deleting product:', err);
    return { success: false, error: err };
  }
};

/**
 * Search products by name
 * @param {string} searchTerm - The search term
 * @returns {Promise<{data: Array, error: Object|null}>}
 */
export const searchProducts = async (searchTerm) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .ilike('name', `%${searchTerm}%`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error searching products:', error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err) {
    console.error('Unexpected error searching products:', err);
    return { data: null, error: err };
  }
};