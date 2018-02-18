/**
 * @file Notes reducer test.
 */

import faker from 'faker';

import reducer, { initialState } from '../../reducers/notes-reducer';
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
} from '../../actions/notes';

describe('Notes reducer', () => {
  it('should return initial state', () => {
    expect(reducer()).toEqual(initialState);
  });

  it('should handle NOTES_FETCH_REQUEST', () => {
    expect(reducer({
      ...initialState,
    }, {
      type: NOTES_FETCH_REQUEST,
    })).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle NOTES_FETCH_SUCCESS', () => {
    const notes = [
      {
        id: faker.random.uuid(),
        message: faker.lorem.words(),
      },
    ];

    expect(reducer({
      ...initialState,
      loading: true,
    }, {
      type: NOTES_FETCH_SUCCESS,
      notes,
    })).toEqual({
      ...initialState,
      loading: false,
      notes,
    });
  });

  it('should handle NOTES_FETCH_FAILURE', () => {
    const error = { message: '401 Unauthorized' };

    expect(reducer({
      ...initialState,
      loading: true,
    }, {
      type: NOTES_FETCH_FAILURE,
      error,
    })).toEqual({
      ...initialState,
      loading: false,
      error,
    });
  });

  it('should handle NOTE_ADD_REQUEST', () => {
    expect(reducer({
      ...initialState,
    }, {
      type: NOTE_ADD_REQUEST,
    })).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle NOTE_ADD_SUCCESS', () => {
    const note = {
      id: faker.random.uuid(),
      message: faker.lorem.words(),
    };

    expect(reducer({
      ...initialState,
      loading: true,
    }, {
      type: NOTE_ADD_SUCCESS,
      note,
    })).toEqual({
      ...initialState,
      loading: false,
      notes: [note],
    });
  });

  it('should handle NOTE_ADD_FAILURE', () => {
    const error = { message: '401 Unauthorized' };

    expect(reducer({
      ...initialState,
      loading: true,
    }, {
      type: NOTE_ADD_FAILURE,
      error,
    })).toEqual({
      ...initialState,
      loading: false,
      error,
    });
  });

  it('should handle NOTE_UPDATE_REQUEST', () => {
    expect(reducer({
      ...initialState,
    }, {
      type: NOTE_UPDATE_REQUEST,
    })).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle NOTE_UPDATE_SUCCESS', () => {
    const note = {
      id: faker.random.uuid(),
      message: faker.lorem.words(),
    };

    const updatedNote = {
      ...note,
      message: faker.lorem.words(),
    };

    expect(reducer({
      ...initialState,
      loading: true,
      notes: [note],
    }, {
      type: NOTE_UPDATE_SUCCESS,
      note: updatedNote,
    })).toEqual({
      ...initialState,
      loading: false,
      notes: [updatedNote],
    });
  });

  it('should handle NOTE_UPDATE_FAILURE', () => {
    const error = { message: '401 Unauthorized' };

    expect(reducer({
      ...initialState,
      loading: true,
    }, {
      type: NOTE_UPDATE_FAILURE,
      error,
    })).toEqual({
      ...initialState,
      loading: false,
      error,
    });
  });

  it('should handle NOTE_DELETE_REQUEST', () => {
    expect(reducer({
      ...initialState,
    }, {
      type: NOTE_DELETE_REQUEST,
    })).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle NOTE_DELETE_SUCCESS', () => {
    const note = {
      id: faker.random.uuid(),
      message: faker.lorem.words(),
    };

    expect(reducer({
      ...initialState,
      loading: true,
      notes: [note],
    }, {
      type: NOTE_DELETE_SUCCESS,
      noteId: note.id,
    })).toEqual({
      ...initialState,
      loading: false,
      notes: [],
    });
  });

  it('should handle NOTE_DELETE_FAILURE', () => {
    const error = { message: '401 Unauthorized' };

    expect(reducer({
      ...initialState,
      loading: true,
    }, {
      type: NOTE_DELETE_FAILURE,
      error,
    })).toEqual({
      ...initialState,
      loading: false,
      error,
    });
  });
});
