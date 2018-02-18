/**
 * @file Note related actions.
 */

import axios from 'axios';

import { API_BASE_URL } from '../constants/api';

export const NOTES_FETCH_REQUEST = 'notes/NOTES_FETCH_REQUEST';
export const NOTES_FETCH_SUCCESS = 'notes/NOTES_FETCH_SUCCESS';
export const NOTES_FETCH_FAILURE = 'notes/NOTES_FETCH_FAILURE';
export const NOTE_ADD_REQUEST = 'notes/NOTE_ADD_REQUEST';
export const NOTE_ADD_SUCCESS = 'notes/NOTE_ADD_SUCCESS';
export const NOTE_ADD_FAILURE = 'notes/NOTE_ADD_FAILURE';
export const NOTE_UPDATE_REQUEST = 'notes/NOTE_UPDATE_REQUEST';
export const NOTE_UPDATE_SUCCESS = 'notes/NOTE_UPDATE_SUCCESS';
export const NOTE_UPDATE_FAILURE = 'notes/NOTE_UPDATE_FAILURE';
export const NOTE_DELETE_REQUEST = 'notes/NOTE_DELETE_REQUEST';
export const NOTE_DELETE_SUCCESS = 'notes/NOTE_DELETE_SUCCESS';
export const NOTE_DELETE_FAILURE = 'notes/NOTE_DELETE_FAILURE';

const fetchNotesRequest = () => {
  return { type: NOTES_FETCH_REQUEST };
};

const fetchNotesSuccess = (notes) => {
  return { type: NOTES_FETCH_SUCCESS, notes };
};

const fetchNotesFailure = (error) => {
  return { type: NOTES_FETCH_FAILURE, error };
};

export const fetchNotes = () => async (dispatch) => {
  dispatch(fetchNotesRequest());

  try {
    const response = await axios.get(`${API_BASE_URL}/notes`);
    dispatch(fetchNotesSuccess(response.data.notes));
  } catch ({ response }) {
    dispatch(fetchNotesFailure(response.data));
  }
};

const addNoteRequest = () => {
  return { type: NOTE_ADD_REQUEST };
};

const addNoteSuccess = (note) => {
  return { type: NOTE_ADD_SUCCESS, note };
};

const addNoteFailure = (error) => {
  return { type: NOTE_ADD_FAILURE, error };
};

export const addNote = note => async (dispatch) => {
  dispatch(addNoteRequest());

  try {
    const response = await axios.post(`${API_BASE_URL}/note/add`, note);
    dispatch(addNoteSuccess(response.data.note));
  } catch ({ response }) {
    dispatch(addNoteFailure(response.data));
  }
};

const updateNoteRequest = () => {
  return { type: NOTE_UPDATE_REQUEST };
};

const updateNoteSuccess = (note) => {
  return { type: NOTE_UPDATE_SUCCESS, note };
};

const updateNoteFailure = (error) => {
  return { type: NOTE_UPDATE_FAILURE, error };
};

export const updateNote = note => async (dispatch) => {
  dispatch(updateNoteRequest());

  try {
    const response = await axios.post(`${API_BASE_URL}/note/update`, note);
    dispatch(updateNoteSuccess(response.data.note));
  } catch ({ response }) {
    dispatch(updateNoteFailure(response.data));
  }
};

const deleteNoteRequest = () => {
  return { type: NOTE_DELETE_REQUEST };
};

const deleteNoteSuccess = (noteId) => {
  return { type: NOTE_DELETE_SUCCESS, noteId };
};

const deleteNoteFailure = (error) => {
  return { type: NOTE_DELETE_FAILURE, error };
};

export const deleteNote = noteId => async (dispatch) => {
  dispatch(deleteNoteRequest());

  try {
    const response = await axios.post(`${API_BASE_URL}/note/delete`, { id: noteId });
    dispatch(deleteNoteSuccess(response.data.id));
  } catch ({ response }) {
    dispatch(deleteNoteFailure(response.data));
  }
};
