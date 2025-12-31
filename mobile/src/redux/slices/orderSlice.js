// ============================================
// mobile/src/redux/slices/orderSlice.js
// ============================================
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/orders');
    return response.data.data.orders;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
  }
});

// export const createOrder = createAsyncThunk(
//   'orders/createOrder',
//   async (orderData, { rejectWithValue }) => {
//     try {
//       const response = await api.post('/orders/checkout', orderData);
//       return response.data.data.orders;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to create order');
//     }
//   }
// );

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await api.post('/orders/checkout', orderData);
      return response.data.data.orders;  // ← Returns just 'orders'
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create order');
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    items: [],
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export default orderSlice.reducer;