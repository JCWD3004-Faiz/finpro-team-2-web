import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utils/interceptor';
import Cookies from 'js-cookie';
import { Order } from '@/utils/adminInterface';
import { Transaction, TransactionDetails, UserPaymentState } from '@/utils/reduxInterface';
import { UserVoucher } from '@/utils/userInterface';

const initialState: UserPaymentState = {
    orders: [],
    payments: [],
    vouchers: [],
    loading: false,
    error: null,
    details: null,
    totalItems: 0,
    currentPage: 1,
    totalPages: 0,
    status:"",
};

const access_token = Cookies.get('access_token');

export const fetchOrders = createAsyncThunk<Order[], number, { rejectValue: string }>(
  'userPayment/fetchOrders',
  async (user_id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/order/user/${user_id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      return response.data.order_data.orders;
    } catch (error) {
      return rejectWithValue('Failed to fetch orders.');
    }
  }
);

export const cancelOrder = createAsyncThunk<number, { user_id: number, order_id: number }, { rejectValue: string }>(
  'userPayment/cancelOrder',
  async ({ user_id, order_id }, { rejectWithValue }) => {
    try {
      await axios.put(`/api/order/cancel/${user_id}/${order_id}`, {}, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      return order_id;
    } catch (error) {
      return rejectWithValue('Failed to cancel the order.');
    }
  }
);

export const confirmOrder = createAsyncThunk<number, { user_id: number, order_id: number }, { rejectValue: string }>(
  'userPayment/confirmOrder',
  async ({ user_id, order_id }, { rejectWithValue }) => {
    try {
      await axios.put(`/api/order/confirm/${user_id}/${order_id}`, {}, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      return order_id;
    } catch (error) {
      return rejectWithValue('Failed to confirm the order.');
    }
  }
);

export const fetchPaymentHistory = createAsyncThunk<
  { payments: Transaction[]; totalItems: number; currentPage: number; totalPages: number },
  { user_id: number; page: number; limit: number; status?:string },
  { rejectValue: string }
>(
  'userPayment/fetchPaymentHistory',
  async ({ user_id, page, limit, status }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/order/payment-history/${user_id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          page,
          limit,
          status
        },
      });

      return {
        payments: response.data.data.payments,
        totalItems: response.data.data.totalItems,
        currentPage: response.data.data.currentPage,
        totalPages: response.data.data.totalPages,
      };
    } catch (error) {
      return rejectWithValue('Failed to fetch payment history.');
    }
  }
);

export const fetchTransactionDetails = createAsyncThunk<TransactionDetails, { user_id: number, order_id: number }, { rejectValue: string }>(
    'userPayment/fetchTransactionDetails',
    async ({ user_id, order_id }, { rejectWithValue }) => {
      try {
        const response = await axios.get(`/api/order/payment-details/${user_id}/${order_id}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        return response.data.data;
      } catch (error) {
        return rejectWithValue('Failed to fetch payment details.');
      }
    }
);

export const fetchUserVouchers = createAsyncThunk<UserVoucher[], number,{ rejectValue: string }>(
  'userPayment/fetchUserVouchers',
  async (user_id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/profile/vouchers/${user_id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      return response.data.data.vouchers;
    } catch (error) {
      return rejectWithValue('Failed to fetch user vouchers.');
    }
  }
);

const userPaymentSlice = createSlice({
  name: 'userPayment',
  initialState,
  reducers: {
    clearTransactionDetails: (state) => {state.details = null},
    setStatus(state, action) { state.status = action.payload; },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => { state.loading = true; state.error = null})
      .addCase(fetchOrders.fulfilled, (state, action) => {state.loading = false; state.orders = action.payload})
      .addCase(fetchOrders.rejected, (state, action) => { state.loading = false; state.error = action.payload || 'Unknown error'})
      .addCase(cancelOrder.pending, (state) => {state.loading = true})
      .addCase(cancelOrder.fulfilled, (state) => {state.loading = false})
      .addCase(cancelOrder.rejected, (state, action) => {state.loading = false; state.error = action.payload || 'Unknown error'})
      .addCase(confirmOrder.pending, (state) => {state.loading = true})
      .addCase(confirmOrder.fulfilled, (state) => {state.loading = false})
      .addCase(confirmOrder.rejected, (state, action) => {state.loading = false; state.error = action.payload || 'Unknown error'})
      .addCase(fetchPaymentHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload.payments;
        state.totalItems = action.payload.totalItems;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPaymentHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      })
      .addCase(fetchTransactionDetails.pending, (state) => {state.error = null})
      .addCase(fetchTransactionDetails.fulfilled, (state, action) => {state.details = action.payload})
      .addCase(fetchTransactionDetails.rejected, (state, action) => {state.error = action.payload || 'Unknown error'})
      .addCase(fetchUserVouchers.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchUserVouchers.fulfilled, (state, action) => { 
        state.loading = false; 
        state.vouchers = action.payload; 
      })
      .addCase(fetchUserVouchers.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload || 'Unknown error'; 
      });
  },
});

export const { clearTransactionDetails, setStatus } = userPaymentSlice.actions;

export default userPaymentSlice.reducer;
