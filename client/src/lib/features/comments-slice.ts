import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import {CommentType, PartialCommentType} from '@/types';

interface CommentState {
  comments: CommentType[] | null;
  isLoading: boolean;
}

const initialState: CommentState = {
  comments: null,
  isLoading: false
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<CommentType[]>) => {
      state.comments = action.payload;
    },
    createComment: (state, action: PayloadAction<CommentType>) => {
      if(!state.comments) {
        state.comments = [];
      }
      state.comments.push(action.payload);
    },
    updateComment: (state, action: PayloadAction<PartialCommentType>) => {
      if(!state.comments?.length) {
        console.log('No comments found');
        return;
      }
      const index = state.comments.findIndex((comment) => comment.id === action.payload._id);
      state.comments[index] = {...state.comments[index], ...action.payload};
    },
    deleteComment: (state, action: PayloadAction<CommentType['_id']>) => {
      if(!state.comments?.length) {
        console.log('No comments found');
        return;
      }
      state.comments.filter(comment => comment._id !== action.payload);

      if(!state.comments.length) {
        state.comments = null;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  }
});

export const {deleteComment, createComment, setComments, updateComment, setLoading} = commentsSlice.actions;

// export const selectComments = (state: RootState) => state.comment.comments as CommentState;

export default commentsSlice.reducer;
