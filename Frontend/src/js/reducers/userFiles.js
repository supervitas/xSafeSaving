/**
 * Created by nikolaev on 24.08.16.
 */
const initialState = {
    files: [],
    fetching: false,
    error: '',
    currentTag: '',
    filesCount: 0,
	popularTags: []
};
const getMostPopularTags = (files) => {
    const tags = {};
    for (const file of files){
        if(file.tags) {
            for(const tag of file.tags) {
	            if (tags[tag] !== undefined) {
	                tags[tag] = tags[tag] + 1;
                } else {
	                tags[tag] = 0;
                }
            }

        }
    }
	return (Object.keys(tags).sort((a, b) => {return tags[b] - tags[a]}).slice(0, 5))

};

export default function userFiles(state = initialState, action) {

    switch (action.type) {
        case 'GET_FILES_REQUEST': {
	        return {...state, fetching: true, error: '', currentTag: action.payload};
        }

        case 'FILES_FETCHED':
            return { ...state, files: action.payload, fetching: false, error: '',
                popularTags: getMostPopularTags(action.payload)};

        case 'FILES_COUNT_FETCHED':
            return { ...state, filesCount: action.payload.count };

        case 'FILES_NOT_FETCHED':
            return { ...state, error: action.payload.message, fetching: false };

        case 'UPLOAD_FILE_REQUEST':
            return { ...state, fetching: true };

        case 'UPLOAD_FILE_SUCCESS':
            return { ...state, files: action.payload.concat(state.files), fetching: false, error: '',
	            popularTags: getMostPopularTags(action.payload.concat(state.files))};

        case 'UPLOAD_FILE_FAIL':
            return { ...state, error: action.payload.message, fetching: false };

        case 'DELETE_FILE_SUCCESS':
            return { ...state, files: state.files.filter((el) => {return el.path !== action.payload}) };

        case 'ADD_TAG_SUCCESS':
            return { ...state, files: state.files.map((item) => {
                if (item.path === action.payload.path) {
                    if (item.tags !== undefined ) {
                        if(item.tags.indexOf(action.payload.tag) === -1) {
	                        item.tags.push(action.payload.tag)
                        }
                    } else {
	                    item['tags'] = [action.payload.tag]
                    }
                }
                return item
            }), popularTags: getMostPopularTags(state.files)};
        case 'DELETE_TAG_SUCCESS':
	        return { ...state, files: state.files.map((item) => {
		        if (item.path === action.payload.path) {
			         item.tags.splice(item.tags.indexOf(action.payload.tag), 1)
		        }
		        return item
	        }), popularTags: getMostPopularTags(state.files)};
        default:
            return state;
    }

}