import {fetchRequest, dispatchFromFetch} from "./utils";
export function getFiles(data) {

  return (dispatch) => {
    dispatch({
      type: 'GET_FILES_REQUEST'
    });

    let params = Object.keys(data)
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&')
        .replace(/%20/g, '+');

    fetchRequest('api/files?' + params, 'GET')
        .then(response => dispatchFromFetch(response, dispatch, 'FILES_FETCHED', 'FILES_NOT_FETCHED'));
    fetchRequest('api/files/pagination', 'GET')
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
          dispatchFromFetch(response, dispatch, 'DELETE_FILE_SUCCESS', 'DELETE_FILE_FAIL', data.path)
        });
    }
}