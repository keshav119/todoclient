// sidebarSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedButton: null,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    selectButton(state, action) {
      state.selectedButton = action.payload;
    },
  },
});

export const { selectButton } = sidebarSlice.actions;
export default sidebarSlice.reducer;
