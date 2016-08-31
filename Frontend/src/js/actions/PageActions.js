export function getFiles() {

  return (dispatch) => {
    dispatch({
      type: "GET_PHOTOS_REQUEST",
      payload: 2016
    });
  }
}
