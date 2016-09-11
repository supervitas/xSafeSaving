/**
 * Created by nikolaev on 24.08.16.
 */
const initialState = {
    files: [],
    fetching: false,
    error: '',
    filesCount: 0,
};

export default function userFiles(state = initialState, action) {

    switch (action.type) {
        case 'GET_FILES_REQUEST':
           return {...state, fetching: true, error: ''};

        case 'FILES_FETCHED':
            return { ...state, files: action.payload, fetching: false, error: '' };

        case 'FILES_COUNT_FETCHED':
            return { ...state, filesCount: action.payload.count };

        case 'FILES_NOT_FETCHED':
            return { ...state, error: action.payload.message, fetching: false };

        case 'UPLOAD_FILE_REQUEST':
            return { ...state, fetching: true };

        case 'UPLOAD_FILE_SUCCESS':
            return { ...state, files: action.payload.concat(state.files), fetching: false, error: ''};

        case 'UPLOAD_FILE_FAIL':
            return { ...state, error: action.payload.message, fetching: false };

        default:
            return state;
    }

}