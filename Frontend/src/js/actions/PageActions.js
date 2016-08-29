export function getFiles() {

  return (dispatch) => {
    dispatch({
      type: "GET_PHOTOS_REQUEST",
      payload: 2016
    });

    setTimeout(() => {
      dispatch({
        type: "GET_PHOTOS_SUCCESS",
        payload: [1,2,3,4,5]
      })
    }, 1000)
  }
}
