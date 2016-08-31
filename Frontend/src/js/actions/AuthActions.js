/**
 * Created by nikolaev on 29.08.16.
 */
import $ from "jquery";
export function authAction(type, data) {
    switch (type) {
        case 'REGISTER': {
            return (dispatch) => {
                dispatch({
                    type: 'REGISTER_REQUEST'
                });
                $.ajax({
                    type: 'PUT',
                    url: 'api/auth',
                    data: JSON.stringify(data),
                    contentType: 'application/json'
                }).done(function (resData) {
                    dispatch({
                        type: 'REGISTER_SUCCESS',
                        payload: JSON.parse(resData)
                    })
                }).fail(function (resData) {
                    dispatch({
                        type: 'REGISTER_FAIL',
                        payload: JSON.parse(resData.responseText)
                    })
                });
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
            $.ajax({
                type: 'POST',
                url: 'api/auth',
                data: JSON.stringify(data),
                contentType: 'application/json'
            }).always(function (resData) {
                dispatch({
                    type: 'LOGOUT',
                    payload: JSON.parse(resData)
                })
            })
        }

    }
}
