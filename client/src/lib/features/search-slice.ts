import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

interface SearchState {
  query: string;
  isLoading: boolean;
}

const initialState: SearchState = {
  query: '',
  isLoading: false
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    }
  }
});

export const {setSearch} = searchSlice.actions;

// export const selectSearch = (state: RootState) => state.search.search as SearchState;

export default searchSlice.reducer;
