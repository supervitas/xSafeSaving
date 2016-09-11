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
      });
      $.ajax({
        type: 'GET',
        url: 'api/files/pagination',
      }).done(function (resData) {
        dispatch({
          type: 'FILES_COUNT_FETCHED',
          payload: JSON.parse(resData)
        })
      })
    }).fail(function (resData) {
      dispatch({
        type: 'FILES_NOT_FETCHED',
        payload: JSON.parse(resData.responseText)
      })
    });

  }
}

export function uploadFile(uploadType, data) {

  return (dispatch) => {
    dispatch({
      type: "UPLOAD_FILE_REQUEST"
    });
      if (uploadType === 'UPLOAD_FILES') {
        $.ajax({
          type: 'POST',
          url: 'api/files',
          data: data,
          contentType: false,
          processData: false,
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
      if (uploadType === 'UPLOAD_FROM_LINK') {
        $.ajax({
          type: 'POST',
          url: 'api/files',
          data: JSON.stringify(data),
          contentType: 'application/json'
        }).done(function (resData) {
          var array = $.map(JSON.parse(resData), function(value, index) {
            return [value];
          });
          dispatch({
            type: 'UPLOAD_FILE_SUCCESS',
            payload: array
          })
        }).fail(function (resData) {
          dispatch({
            type: 'UPLOAD_FILE_FAIL',
            payload: JSON.parse(resData.responseText)
          })
        });

      }
  }
}
