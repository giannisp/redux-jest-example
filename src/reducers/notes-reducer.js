/**
 * @file Notes reducer.
 */

import {
  NOTES_FETCH_REQUEST,
  NOTES_FETCH_SUCCESS,
  NOTES_FETCH_FAILURE,
  NOTE_ADD_REQUEST,
  NOTE_ADD_SUCCESS,
  NOTE_ADD_FAILURE,
  NOTE_UPDATE_REQUEST,
  NOTE_UPDATE_SUCCESS,
  NOTE_UPDATE_FAILURE,
  NOTE_DELETE_REQUEST,
  NOTE_DELETE_SUCCESS,
  NOTE_DELETE_FAILURE,
} from '../actions/notes';

const initialState = {
  notes: [],
  loading: false,
  error: null,
};

const notesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case NOTES_FETCH_REQUEST:
    case NOTE_ADD_REQUEST:
    case NOTE_UPDATE_REQUEST:
    case NOTE_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NOTES_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        notes: action.notes,
      };

    case NOTE_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        notes: [...state.notes, action.note],
      };

    case NOTE_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        notes: state.notes.map(note => {
          if (note.id !== action.note.id) {
            return note;
          }

          return {
            ...note,
            ...action.note,
          };
        }),
      };

    case NOTE_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        notes: state.notes.filter(note => note.id !== action.noteId),
      };

    case NOTES_FETCH_FAILURE:
    case NOTE_ADD_FAILURE:
    case NOTE_UPDATE_FAILURE:
    case NOTE_DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export { initialState };
export default notesReducer;
