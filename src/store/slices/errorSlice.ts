import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ErrorMessage {
  id: string;
  message: string;
}

interface ErrorState {
  messages: ErrorMessage[];
}

const initialState: ErrorState = {
  messages: [],
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    addErrorMessage: (state, action: PayloadAction<string>) => {
      state.messages.push({
        id: Date.now().toString() + Math.random() * Math.random(),
        message: action.payload,
      });
    },
    removeErrorMessage: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter(
        (msg) => msg.id !== action.payload
      );
    },
  },
});

export const { addErrorMessage, removeErrorMessage } = errorSlice.actions;

const errorReducer = errorSlice.reducer;
export default errorReducer;
