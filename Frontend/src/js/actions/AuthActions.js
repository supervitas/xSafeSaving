/**
 * Created by nikolaev on 29.08.16.
 */
export function authAction(type, data) {
    switch (type) {
        case 'AUTH_CHECK': {
            return (dispatch) => {
                dispatch({
                    type: 'AUTH_CHECK_REQUEST'
                });
                fetch('api/auth',{
                    method: 'GET',
                    headers: {
                        "Content-type": "application/json"
                    },
                    credentials: 'include'
                })
                .then(response => response.json())
                .then(json => {
                dispatch({
                    type: 'AUTH_CHECK_FINISHED',
                    payload: json
                    })
                });
            }
        }
        case 'REGISTER': {
            return (dispatch) => {
                dispatch({
                    type: 'REGISTER_REQUEST'
                });
                fetch('api/auth',{
                    method: 'PUT',
                    headers: {
                        "Content-type": "application/json"
                    },
                    credentials: 'include',
                    body: JSON.stringify(data),
                })
                .then(response => {
                    let json = response.json();
                    if (!response.ok) {
                        json.then(err => {
                            dispatch({
                                type: 'REGISTER_FAIL',
                                payload: err
                            });
                        });
                        return
                    }
                    json.then(data => {
                        dispatch({
                            type: 'REGISTER_SUCCESS',
                            payload: data
                        })
                    })
                })
            }
        }
        case 'LOGIN': {
            return (dispatch) => {
                dispatch({
                    type: 'LOGIN_REQUEST'
                });
                $.ajax({
                    type: 'POST',
                    url: 'api/auth',
                    data: JSON.stringify(data),
                    contentType: 'application/json'
                }).done(function (resData) {
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        payload: JSON.parse(resData)
                    })
                }).fail(function (resData) {
                    dispatch({
                        type: 'LOGIN_FAIL',
                        payload: JSON.parse(resData.responseText)
                    })
                });
            }
        }
        case 'REMOVE_ERROR': {
            return (dispatch) => {
                dispatch({
                    type: 'REMOVE_ERROR',
                })
            }
        }
        case 'LOGOUT': {
            return (dispatch) => {
                $.ajax({
                    type: 'DELETE',
                    url: 'api/auth',
                    contentType: 'application/json'
                }).always(function (resData) {
                    dispatch({
                        type: 'LOGOUT'
                    })
                })
            }
        }

    }
}
