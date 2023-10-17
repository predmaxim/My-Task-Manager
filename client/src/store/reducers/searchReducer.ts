export type SearchReducerStateType = {
  query: string
}

export type SearchPayloadType = string;

type SearchActionType = {
  type: string,
  payload?: SearchPayloadType
}

export const initialState: SearchReducerStateType = {
  query: ''
};

// actions
export const SET_SEARCH = 'SET_SEARCH';
export const DELETE_SEARCH = 'DELETE_SEARCH';

// reducers
export const searchReducer = (
  state: SearchReducerStateType = initialState,
  action: SearchActionType
): SearchReducerStateType => {

  switch (action.type) {
    case SET_SEARCH:
      return {
        ...state,
        query: action.payload as SearchPayloadType
      };

    case DELETE_SEARCH:
      return {
        ...state,
        query: ''
      };

    default:
      return state;
  }
};

// action creators
export const setSearch = (payload: SearchPayloadType): SearchActionType =>
  ({ type: SET_SEARCH, payload });

export const deleteSearch = (): SearchActionType =>
  ({ type: DELETE_SEARCH });
