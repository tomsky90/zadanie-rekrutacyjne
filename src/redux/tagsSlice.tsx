import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Tags {
  items: {
    name: string;
    count: number;
  }[];
}

const initialState: Tags = { items: [] };

export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Tags>) => {
      state.items = action.payload.items;
    },
  },
});

export const { setData } = tagsSlice.actions;

export default tagsSlice.reducer;
