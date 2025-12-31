// ============================================
// mobile/src/redux/slices/cartSlice.js
// ============================================
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/cart');
    return response.data.data.cart;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
  }
});

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity, resellerId, resellerMargin }, { rejectWithValue }) => {
    try {
      const response = await api.post('/cart/items', {
        productId,
        quantity,
        resellerId,
        resellerMargin
      });
      return response.data.data.cart;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add to cart');
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ itemId, quantity }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/cart/items/${itemId}`, { quantity });
      return response.data.data.cart;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update cart');
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (itemId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/cart/items/${itemId}`);
      return response.data.data.cart;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove item');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
        state.totalItems = action.payload.totalItems || 0;
        state.totalPrice = action.payload.totalPrice || 0;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
        state.totalItems = action.payload.totalItems || 0;
        state.totalPrice = action.payload.totalPrice || 0;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
        state.totalItems = action.payload.totalItems || 0;
        state.totalPrice = action.payload.totalPrice || 0;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
        state.totalItems = action.payload.totalItems || 0;
        state.totalPrice = action.payload.totalPrice || 0;
      });
  }
});

export default cartSlice.reducer;
