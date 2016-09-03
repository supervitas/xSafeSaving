/**
 * Created by nikolaev on 29.08.16.
 */
import $ from "jquery";
export function authAction(type, data) {
    switch (type) {
        case 'AUTHCHECK': {
            return (dispatch) => {
                dispatch({
                    type: 'AUTHCHECK_REQUEST'
                });
                $.ajax({
                    type: 'GET',
                    url: 'api/auth',
                    contentType: 'application/json'
                }).done(function (resData) {
                    dispatch({
                        type: 'AUTHCHECK_FINISHED',
                        payload: JSON.parse(resData)
                    })
                });
            }
        }
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
