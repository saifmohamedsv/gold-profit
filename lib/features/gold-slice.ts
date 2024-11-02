import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGoldPrice = createAsyncThunk("gold/fetchGoldPrice", async () => {
  console.log("123");

  const response = await axios.get(process.env.NEXT_PUBLIC_RAPID_API_URL as string, {
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
    },
  });

  const currency = response.data.baseCurrency;
  const local_price_for_gram = response.data.rates.XAU;

  return { currency, local_price_for_gram: parseInt((local_price_for_gram / 31.1).toFixed(2)) }; // Return only the XAU rate for simplicity
});

interface GoldState {
  currency: string;
  local_price_for_gram: number | null;
  loading: boolean;
  grams: string;
  moneySpent: string;
}

const initialState = {
  local_price_for_gram: null,
  currency: "",
  grams: "22",
  moneySpent: "91370",
  loading: false,
} satisfies GoldState as GoldState;

const goldSlice = createSlice({
  name: "gold",
  initialState,
  reducers: {
    setGrams: (state, action) => {
      state.grams = action.payload;
    },
    setMoneySpent: (state, action) => {
      state.moneySpent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoldPrice.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGoldPrice.fulfilled, (state, action) => {
        state.loading = false;
        state.local_price_for_gram = action.payload.local_price_for_gram;
        state.currency = action.payload.currency;
      })
      .addCase(fetchGoldPrice.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setGrams, setMoneySpent } = goldSlice.actions;
export default goldSlice.reducer;
