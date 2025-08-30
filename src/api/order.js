import { supabase } from './supabase.js';

/**
 * Create a new order with order items
 * @param {Object} orderData - Order information
 * @param {string} orderData.customer_name - Customer's name
 * @param {string} orderData.email - Customer's email
 * @param {string} orderData.phone - Customer's phone number
 * @param {string} orderData.address - Customer's address
 * @param {string} orderData.city - Customer's city
 * @param {string} orderData.postal_code - Customer's postal code
 * @param {Array} cartItems - Array of cart items
 * @param {number} cartItems[].product_id - Product ID
 * @param {number} cartItems[].quantity - Quantity ordered
 * @param {number} cartItems[].price - Price at time of purchase
 * @returns {Promise<{data: Object|null, error: Object|null}>}
 */
export const createOrder = async (orderData, cartItems) => {
  try {
    // Validate required fields
    const { customer_name, email, address } = orderData;
    if (!customer_name || !email || !address) {
      return {
        data: null,
        error: { message: 'Customer name, email, and address are required' }
      };
    }

    if (!cartItems || cartItems.length === 0) {
      return {
        data: null,
        error: { message: 'Cart cannot be empty' }
      };
    }

    // Start a Supabase transaction by creating the order first
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          customer_name: customer_name.trim(),
          email: email.trim(),
          phone: orderData.phone?.trim() || null,
          address: address.trim(),
          city: orderData.city?.trim() || null,
          postal_code: orderData.postal_code?.trim() || null
        }
      ])
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      return { data: null, error: orderError };
    }

    // Create ordered items
    const orderedItems = cartItems.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price_at_purchase: item.price
    }));

    const { data: items, error: itemsError } = await supabase
      .from('ordered_items')
      .insert(orderedItems)
      .select();

    if (itemsError) {
      console.error('Error creating ordered items:', itemsError);
      // If ordered items fail, we should clean up the order
      await supabase.from('orders').delete().eq('id', order.id);
      return { data: null, error: itemsError };
    }

    return { 
      data: { 
        order, 
        items,
        total_items: items.length 
      }, 
      error: null 
    };
  } catch (err) {
    console.error('Unexpected error creating order:', err);
    return { data: null, error: err };
  }
};

/**
 * Get order details including ordered items and product information
 * @param {number} orderId - The order ID
 * @returns {Promise<{data: Object|null, error: Object|null}>}
 */
export const getOrderById = async (orderId) => {
  try {
    // Fetch order details
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (orderError) {
      console.error('Error fetching order:', orderError);
      return { data: null, error: orderError };
    }

    // Fetch ordered items with product details
    const { data: orderedItems, error: itemsError } = await supabase
      .from('ordered_items')
      .select(`
        *,
        products (
          id,
          name,
          image
        )
      `)
      .eq('order_id', orderId);

    if (itemsError) {
      console.error('Error fetching ordered items:', itemsError);
      return { data: null, error: itemsError };
    }

    // Calculate total amount
    const totalAmount = orderedItems.reduce((sum, item) => {
      return sum + (item.price_at_purchase * item.quantity);
    }, 0);

    return {
      data: {
        ...order,
        items: orderedItems,
        total_amount: totalAmount
      },
      error: null
    };
  } catch (err) {
    console.error('Unexpected error fetching order:', err);
    return { data: null, error: err };
  }
};

/**
 * Get all orders (for admin purposes)
 * @param {Object} options - Query options
 * @param {number} options.limit - Limit number of results
 * @param {number} options.offset - Offset for pagination
 * @returns {Promise<{data: Array|null, error: Object|null}>}
 */
export const getAllOrders = async (options = {}) => {
  try {
    const { limit = 50, offset = 0 } = options;

    let query = supabase
      .from('orders')
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
      console.error('Error fetching orders:', error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err) {
    console.error('Unexpected error fetching orders:', err);
    return { data: null, error: err };
  }
};

/**
 * Get orders by customer email
 * @param {string} email - Customer's email
 * @returns {Promise<{data: Array|null, error: Object|null}>}
 */
export const getOrdersByEmail = async (email) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('email', email)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders by email:', error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err) {
    console.error('Unexpected error fetching orders by email:', err);
    return { data: null, error: err };
  }
};

/**
 * Update order status (if you add a status field later)
 * @param {number} orderId - The order ID
 * @param {Object} updateData - Data to update
 * @returns {Promise<{data: Object|null, error: Object|null}>}
 */
export const updateOrder = async (orderId, updateData) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', orderId)
      .select()
      .single();

    if (error) {
      console.error('Error updating order:', error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err) {
    console.error('Unexpected error updating order:', err);
    return { data: null, error: err };
  }
};