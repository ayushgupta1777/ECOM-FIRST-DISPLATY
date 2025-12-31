// ============================================
// mobile/src/redux/slices/resellerSlice.js
// ============================================
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const generateShareLink = createAsyncThunk(
  'reseller/generateShareLink',
  async ({ productId, margin }, { rejectWithValue }) => {
    try {
      const response = await api.post('/reseller/share-link', { productId, margin });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to generate link');
    }
  }
);

export const fetchWallet = createAsyncThunk('reseller/fetchWallet', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/reseller/wallet');
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch wallet');
  }
});

export const requestPayout = createAsyncThunk(
  'reseller/requestPayout',
  async (payoutData, { rejectWithValue }) => {
    try {
      const response = await api.post('/reseller/payout-request', payoutData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to request payout');
    }
  }
);

const resellerSlice = createSlice({
  name: 'reseller',
  initialState: {
    shareData: null,
    wallet: null,
    transactions: [],
    isLoading: false,
    error: null
  },
  reducers: {
    clearShareData: (state) => {
      state.shareData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateShareLink.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(generateShareLink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shareData = action.payload;
      })
      .addCase(generateShareLink.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchWallet.fulfilled, (state, action) => {
        state.wallet = action.payload.wallet;
        state.transactions = action.payload.transactions;
      });
  }
});

export const { clearShareData } = resellerSlice.actions;
export default resellerSlice.reducer;