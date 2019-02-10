/**
 * @file Notes action tests.
 */

import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import faker from 'faker';

import {
  fetchNotes,
  addNote,
  updateNote,
  deleteNote,
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
} from '../../actions/notes';
import { initialState } from '../../reducers/notes-reducer';
import { API_BASE_URL } from '../../constants/api';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const axiosMock = new MockAdapter(axios);

describe('Notes action', () => {
  afterEach(() => {
    axiosMock.reset();
  });

  it('should dispatch NOTES_FETCH_SUCCESS on fetchNotes success', async () => {
    const notes = [
      {
        id: faker.random.uuid(),
        message: faker.lorem.words(),
      },
    ];

    axiosMock.onGet(`${API_BASE_URL}/notes`).reply(200, { notes });

    const expectedActions = [
      { type: NOTES_FETCH_REQUEST },
      { type: NOTES_FETCH_SUCCESS, notes },
    ];

    const store = mockStore(initialState);

    await store.dispatch(fetchNotes());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should dispatch NOTES_FETCH_FAILURE on fetchNotes error', async () => {
    const error = { message: '401 Unauthorized' };

    axiosMock.onGet(`${API_BASE_URL}/notes`).reply(401, error);

    const expectedActions = [
      { type: NOTES_FETCH_REQUEST },
      { type: NOTES_FETCH_FAILURE, error },
    ];

    const store = mockStore(initialState);

    await store.dispatch(fetchNotes());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should dispatch NOTE_ADD_SUCCESS on addNote success', async () => {
    const data = { message: faker.lorem.words() };
    const note = {
      ...data,
      id: faker.random.uuid(),
    };

    axiosMock.onPost(`${API_BASE_URL}/note/add`, data).reply(200, { note });

    const expectedActions = [
      { type: NOTE_ADD_REQUEST },
      { type: NOTE_ADD_SUCCESS, note },
    ];

    const store = mockStore(initialState);

    await store.dispatch(addNote(data));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should dispatch NOTE_ADD_FAILURE on addNote error', async () => {
    const data = { message: faker.lorem.words() };
    const error = { message: '401 Unauthorized' };

    axiosMock.onPost(`${API_BASE_URL}/note/add`, data).reply(401, error);

    const expectedActions = [
      { type: NOTE_ADD_REQUEST },
      { type: NOTE_ADD_FAILURE, error },
    ];

    const store = mockStore(initialState);

    await store.dispatch(addNote(data));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should dispatch NOTE_UPDATE_SUCCESS on updateNote success', async () => {
    const note = {
      id: faker.random.uuid(),
      message: faker.lorem.words(),
    };

    axiosMock.onPost(`${API_BASE_URL}/note/update`, note).reply(200, { note });

    const expectedActions = [
      { type: NOTE_UPDATE_REQUEST },
      { type: NOTE_UPDATE_SUCCESS, note },
    ];

    const store = mockStore(initialState);

    await store.dispatch(updateNote(note));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should dispatch NOTE_UPDATE_FAILURE on updateNote error', async () => {
    const note = {
      id: faker.random.uuid(),
      message: faker.lorem.words(),
    };
    const error = { message: '401 Unauthorized' };

    axiosMock.onPost(`${API_BASE_URL}/note/update`, note).reply(401, error);

    const expectedActions = [
      { type: NOTE_UPDATE_REQUEST },
      { type: NOTE_UPDATE_FAILURE, error },
    ];

    const store = mockStore(initialState);

    await store.dispatch(updateNote(note));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should dispatch NOTE_DELETE_SUCCESS on deleteNote success', async () => {
    const data = {
      id: faker.random.uuid(),
    };
    const response = {
      ...data,
      success: true,
    };

    axiosMock.onPost(`${API_BASE_URL}/note/delete`, data).reply(200, response);

    const expectedActions = [
      { type: NOTE_DELETE_REQUEST },
      { type: NOTE_DELETE_SUCCESS, noteId: data.id },
    ];

    const store = mockStore(initialState);

    await store.dispatch(deleteNote(data.id));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should dispatch NOTE_DELETE_FAILURE on deleteNote error', async () => {
    const data = {
      id: faker.random.uuid(),
    };
    const error = { message: '401 Unauthorized' };

    axiosMock.onPost(`${API_BASE_URL}/note/delete`, data).reply(401, error);

    const expectedActions = [
      { type: NOTE_DELETE_REQUEST },
      { type: NOTE_DELETE_FAILURE, error },
    ];

    const store = mockStore(initialState);

    await store.dispatch(deleteNote(data.id));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
