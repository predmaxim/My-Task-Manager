import {CommentType} from '@/utils/types';

export type CommentReducerStateType = {
  comments: CommentType[],
  isLoading: boolean,
};

export type CommentPayloadType = CommentType | CommentType[] | string | boolean

type CommentActionType = {
  type: string,
  payload?: CommentPayloadType
}

export const initialState: CommentReducerStateType = {
  comments: [],
  isLoading: true
};

// actions
export const SET_COMMENTS = 'SET_COMMENTS';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const SET_LOADING = 'SET_LOADING';

// reducers
export const commentReducer = (
  state: CommentReducerStateType = initialState,
  action: CommentActionType
): CommentReducerStateType => {

  switch (action.type) {
    case SET_COMMENTS:
      return {
        ...state,
        comments: action.payload as CommentType[]
      };

    case CREATE_COMMENT:
      const comments: CommentType[] = [...state.comments];
      const newComment: CommentType = action.payload as CommentType;
      comments.push(newComment);
      return {
        ...state,
        comments: comments
      };

    case UPDATE_COMMENT:
      const updatedComment: CommentType = action.payload as CommentType;
      const commentsWithoutCommentToUpdate: CommentType[] = state.comments
        .filter((comment: CommentType) => comment.id !== updatedComment.id);
      return {
        ...state,
        comments: [...commentsWithoutCommentToUpdate, updatedComment]
      };

    case DELETE_COMMENT:
      const commentId = (action.payload as CommentType).id;
      const newComments: CommentType[] = [
        ...state.comments
          .filter((comment: CommentType) => comment.id !== commentId)
      ];
      return {
        ...state,
        comments: newComments
      };

    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload as boolean
      };

    default:
      return state;
  }
};

// action creators
export const getCommentsAction = (): CommentActionType =>
  ({type: SET_COMMENTS});

export const createCommentAction = (payload: CommentPayloadType): CommentActionType =>
  ({type: CREATE_COMMENT, payload});

export const updateCommentAction = (payload: CommentPayloadType): CommentActionType =>
  ({type: UPDATE_COMMENT, payload});

export const deleteCommentAction = (payload: CommentPayloadType): CommentActionType =>
  ({type: DELETE_COMMENT, payload});

export const setLoadingCommentsAction = (payload: boolean): CommentActionType =>
  ({type: SET_LOADING, payload});
