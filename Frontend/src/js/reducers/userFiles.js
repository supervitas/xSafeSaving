/**
 * Created by nikolaev on 24.08.16.
 */
const initialState = {
    files: [],
    fetching: false,
    error: ''
};

export default function userFiles(state = initialState, action) {

    switch (action.type) {
        // case GET_PHOTOS_REQUEST:
        //     return { ...state, year: action.payload, fetching: true, error: '' }
        //
        // case GET_PHOTOS_SUCCESS:
        //     return { ...state, photos: action.payload, fetching: false, error: '' }
        //
        // case GET_PHOTOS_FAIL:
        //     return { ...state, error: action.payload.message, fetching: false }

        default:
            return state;
    }

}