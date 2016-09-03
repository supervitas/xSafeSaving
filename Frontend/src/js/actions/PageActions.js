export function getFiles(data) {

  return (dispatch) => {
    dispatch({
      type: "GET_FILES_REQUEST"
    });

    $.ajax({
      type: 'GET',
      url: 'api/files',
      data: data,
      contentType: 'application/json'
    }).done(function (resData) {
      dispatch({
        type: 'FILES_FETCHED',
        payload: JSON.parse(resData)
      })
    }).fail(function (resData) {
      dispatch({
        type: 'FILES_NOT_FETCHED',
        payload: JSON.parse(resData.responseText)
      })
    });
  }
}
export function uploadFile(data) {
  return (dispatch) => {
    dispatch({
      type: "UPLOAD_FILE_REQUEST"
    });

    $.ajax({
      type: 'GET',
      url: 'api/files',
      data: data,
      contentType: 'application/json'
    }).done(function (resData) {
      dispatch({
        type: 'UPLOAD_FILE_SUCCESS',
        payload: JSON.parse(resData)
      })
    }).fail(function (resData) {
      dispatch({
        type: 'UPLOAD_FILE_FAIL',
        payload: JSON.parse(resData.responseText)
      })
    });
  }
}
