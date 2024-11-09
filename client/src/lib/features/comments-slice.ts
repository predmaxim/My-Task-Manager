import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { CommentType } from '@/types';

interface CommentState {
  comments: CommentType[] | null;
  isLoading: boolean;
}

const initialState: CommentState = {
  comments: null,
  isLoading: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<CommentType[]>) => {
      state.comments = action.payload;
    },
  },
});

export const { setComments } = commentsSlice.actions;
export default commentsSlice.reducer;
