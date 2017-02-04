import {fetchRequest, dispatchFromFetch} from "./utils";
export function getFiles(data) {

  return (dispatch) => {
    dispatch({
        type: 'GET_FILES_REQUEST',
        payload: data.tag || ''
    });

    let params = Object.keys(data)
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&')
        .replace(/%20/g, '+');

    fetchRequest('api/files?' + params, 'GET')
        .then(response => dispatchFromFetch(response, dispatch, 'FILES_FETCHED', 'FILES_NOT_FETCHED'));
    fetchRequest('api/files/pagination?' + params, 'GET')
        .then(response => dispatchFromFetch(response, dispatch, 'FILES_COUNT_FETCHED', 'FILES_NOT_FETCHED'));
  }
}

export function uploadFile(uploadType, data) {

  return (dispatch) => {
    dispatch({
      type: 'UPLOAD_FILE_REQUEST'
    });

    if (uploadType === 'UPLOAD_FILES') {
        fetch('api/files', {
          method: 'POST',
          credentials: 'include',
          body: data
        })
        .then(response => {
          dispatchFromFetch(response, dispatch, 'UPLOAD_FILE_SUCCESS', 'UPLOAD_FILE_FAIL');
          $('#upload').modal('hide');
        });
    }

    if (uploadType === 'UPLOAD_FROM_LINK') {
      fetchRequest('api/files', 'POST', JSON.stringify(data))
          .then(response => {
            dispatchFromFetch(response, dispatch, 'UPLOAD_FILE_SUCCESS', 'UPLOAD_FILE_FAIL');
            $('#upload').modal('hide');
          });
      }
  }
}

export function deleteFile(data) {
    return (dispatch) => {
    dispatch({
      type: 'DELETE_FILE_REQUEST'
    });
    fetchRequest('api/files', 'DELETE', JSON.stringify(data))
        .then(response => {
          $('#deleteModal').modal('hide');
          dispatchFromFetch(response, dispatch, 'DELETE_FILE_SUCCESS', 'DELETE_FILE_FAIL', data.path);
        });
    }
}

export function addTag(data) {
    return (dispatch) => {
        fetchRequest('api/files/tags', 'POST', JSON.stringify(data))
            .then(response => {
	            dispatchFromFetch(response, dispatch, 'ADD_TAG_SUCCESS', 'ADD_TAG_FAIL', {path:data.path, tag:data.tag});
            })
    }
}

export function deleteTag(data) {
	return (dispatch) => {
		fetchRequest('api/files/tags', 'DELETE', JSON.stringify(data))
			.then(response => {
				dispatchFromFetch(response, dispatch, 'DELETE_TAG_SUCCESS', 'DELETE_TAG_FAIL', {path:data.path, tag: data.tag});
			})
	}
}

export function changePage(page){
      return (dispatch) => {
            dispatch({
                type: 'PAGE_CHANGED',
                payload: {page: page}
        });
      }
}