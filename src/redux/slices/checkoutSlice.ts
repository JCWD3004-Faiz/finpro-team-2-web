import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utils/interceptor';
import Cookies from 'js-cookie';
import { UserVoucher, OrderDetails } from '@/utils/userInterface';
import axiosHandler from "axios"

interface CheckoutState {
  orderDetails: OrderDetails | null;
  selectedAddress: string | undefined;
  selectedShipping: string | undefined;
  loading: boolean;
  error: string | null;
  updateAddress: any
  shippingMethod: any
  newShippingPrice: number
  shippingVouchers: any[]
  paymentError: string | null;
  vaBankTransferData: any;
  vaBankTransferError: string | null;
  paymentDetails: any
}

const initialState: CheckoutState = {
  orderDetails: null,
  selectedAddress: undefined,
  selectedShipping: undefined,
  loading: false,
  error: null,
  updateAddress: null,
  shippingMethod: null,
  newShippingPrice: 0,
  shippingVouchers: [],
  paymentError: null,
  vaBankTransferData: null,
  vaBankTransferError: null,
  paymentDetails: null,
};

const access_token = Cookies.get('access_token');

export const fetchOrderDetails = createAsyncThunk(
  'checkout/fetchOrderDetails',
  async (params: { user_id: number; order_id: number }) => {
    const response = await axios.get(`/api/order/details/${params.user_id}/${params.order_id}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return response.data.data.order;
  }
);

export const updateAddress = createAsyncThunk(
  'checkout/updateAddress',
  async (params: { user_id: number; order_id: number; address_id: string }, { rejectWithValue }) => {
    try {
      const response = await axiosHandler.put(
        '/api/order/address',
        { user_id: params.user_id, order_id: params.order_id, address_id: params.address_id },
        { headers: { Authorization: `Bearer ${access_token}` } }
      );      
      return response.data.new_shipping_price; // Return the new shipping price if valid
    } catch (err) {
      if (axiosHandler.isAxiosError(err) && err.response) {
        return rejectWithValue("Address is too far away from the store.");
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export const updateShippingMethod = createAsyncThunk(
  'checkout/updateShippingMethod',
  async (params: { user_id: number; order_id: number; shipping_method: string }) => {
    const response = await axios.put(
        '/api/order/method',
      { user_id: params.user_id, order_id: params.order_id, shipping_method: params.shipping_method },
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    return response.data.new_shipping_price
  }
);

export const fetchShippingVouchers = createAsyncThunk<UserVoucher[], number,{ rejectValue: string }>(
  'userPayment/fetchShippingVouchers',
  async (user_id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/order/shipping-vouchers/${user_id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      return response.data.data.vouchers;
    } catch (error) {
      return rejectWithValue('Failed to fetch shipping vouchers.');
    }
  }
);

export const redeemShippingVoucher = createAsyncThunk(
  'checkout/redeemShippingVoucher',
  async (params: { user_id: number; order_id: number; redeem_code: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/order/redeem-shipping', params, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue('Failed to apply shipping voucher discount');
    }
  }
);

export const submitPayment = createAsyncThunk(
  'checkout/submitPayment',
  async (
    params: { user_id: number; order_id: number; paymentMethod: string; date: string; popImage: File | null },
    { rejectWithValue }
  ) => {
    const { user_id, order_id, paymentMethod, date, popImage } = params;
    const formData = new FormData();
    if (popImage) formData.append('pop_image', popImage);
    formData.append('payment_method', paymentMethod);
    formData.append('payment_date', date);

    try {
      const response = await axios.post(
        `/api/order/payment/${user_id}/${order_id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      if (response.data.message === 'Payment created successfully') {
        return response.data;
      }
      return rejectWithValue(response.data.error || 'Failed to submit payment');
    } catch (error) {
      return rejectWithValue('An error occurred while submitting payment');
    }
  }
);

export const createVABankTransfer = createAsyncThunk(
  'checkout/createVABankTransfer',
  async (params: { user_id: number; transaction_id: string }, { rejectWithValue }) => {
    const { user_id, transaction_id } = params;
    try {
      const response = await axios.post(
        '/api/midtrans',
        { user_id, transaction_id },
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to create VA Bank Transfer');
    }
  }
);

export const updateMidtransPaymentStatus = createAsyncThunk(
  'checkout/updateMidtransPaymentStatus',
  async (params: { user_id: number; transaction_id: string }, { rejectWithValue }) => {
    const { user_id, transaction_id } = params;
    try {
      const response = await axios.put(
        '/api/midtrans/status/',
        { user_id, transaction_id },
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to update payment status');
    }
  }
);

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
    setSelectedShipping: (state, action) => {
      state.selectedShipping = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchOrderDetails.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchOrderDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.orderDetails = action.payload;
    })
    .addCase(fetchOrderDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch order details';
    })
    .addCase(updateAddress.pending, (state) => {
      state.loading = true;
    })
    .addCase(updateAddress.fulfilled, (state, action) => {
      state.loading = false;
      state.updateAddress = action.payload;
      state.newShippingPrice = action.payload;
      state.error = null;  // Clear any previous errors
    })
    .addCase(updateAddress.rejected, (state, action) => {
      state.loading = false;
      state.error = String(action.payload) || 'Failed to update address';
      state.selectedAddress = ""
    })
    .addCase(updateShippingMethod.pending, (state) => {
      state.loading = true;
    })
    .addCase(updateShippingMethod.fulfilled, (state, action) => {
      state.loading = false;
      state.shippingMethod = action.payload;
      state.newShippingPrice = action.payload;
    })
    .addCase(updateShippingMethod.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to update shipping method';
    })
    .addCase(fetchShippingVouchers.pending, (state) => { state.loading = true; state.error = null; })
    .addCase(fetchShippingVouchers.fulfilled, (state, action) => { 
      state.loading = false; 
      state.shippingVouchers = action.payload; 
    })
    .addCase(fetchShippingVouchers.rejected, (state, action) => { 
      state.loading = false; 
      state.error = action.payload || 'Unknown error'; 
    })
    .addCase(redeemShippingVoucher.pending, (state) => {
      state.loading = true;
    })
    .addCase(redeemShippingVoucher.fulfilled, (state, action) => {
      state.loading = false;
      state.newShippingPrice = action.payload.newShippingPrice;
    })
    .addCase(redeemShippingVoucher.rejected, (state, action) => {
      state.loading = false;
      state.error = typeof action.payload === 'string' ? action.payload : 'Failed to apply shipping voucher discount';
    })
    .addCase(submitPayment.pending, (state) => {
      state.loading = true;
      state.paymentError = null;
    })
    .addCase(submitPayment.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(submitPayment.rejected, (state, action) => {
      state.loading = false;
      state.paymentError = action.payload as string || 'Failed to submit payment';
    })
    .addCase(createVABankTransfer.pending, (state) => {
      state.loading = true;
      state.vaBankTransferError = null;
    })
    .addCase(createVABankTransfer.fulfilled, (state, action) => {
      state.loading = false;
      state.vaBankTransferData = action.payload;
    })
    .addCase(createVABankTransfer.rejected, (state, action) => {
      state.loading = false;
      state.vaBankTransferError = action.payload as string || 'Failed to create VA Bank Transfer';
    })
    .addCase(updateMidtransPaymentStatus.pending, (state) => {
      state.loading = true;
      state.paymentError = null;
    })
    .addCase(updateMidtransPaymentStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.paymentDetails = action.payload; 
    })
    .addCase(updateMidtransPaymentStatus.rejected, (state, action) => {
      state.loading = false;
      state.paymentError = action.payload as string || 'Failed to update payment status';
    })
  },
});

export const { setSelectedAddress, setSelectedShipping } = checkoutSlice.actions;

export default checkoutSlice.reducer;
