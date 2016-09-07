/**
 * Created by nikolaev on 24.08.16.
 */
const initialState = {
    files: {},
    fetching: false,
    error: ''
};

export default function userFiles(state = initialState, action) {

    switch (action.type) {
        case 'GET_FILES_REQUEST':
           return {...state, fetching: true, error: ''};

        case 'FILES_FETCHED':
            return { ...state, files: action.payload, fetching: false, error: '' };

        case 'FILES_NOT_FETCHED':
            return { ...state, error: action.payload.message, fetching: false };

        case 'UPLOAD_FILE_REQUEST':
            return { ...state, fetching: true };

        case 'UPLOAD_FILE_SUCCESS':
            const newId = Object.keys(action.payload);
            return { ...state, files: {...state.files, [newId]:action.payload[newId]}, fetching: false};

        case 'UPLOAD_FILE_FAIL':
            return { ...state, error: action.payload.message, fetching: true };

        default:
            return state;
    }

}