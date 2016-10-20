/**
 * Created by nikolaev on 29.08.16.
 */
import {fetchRequest, dispatchFromFetch} from "./utils";
export function authAction(type, data) {
    switch (type) {
        case 'AUTH_CHECK': {
            return (dispatch) => {
                dispatch({
                    type: 'AUTH_CHECK_REQUEST'
                });

                fetchRequest('api/auth', 'GET')
                    .then(response => dispatchFromFetch(response,  dispatch, 'AUTH_CHECK_FINISHED'));
            }
        }
        case 'REGISTER': {
            return (dispatch) => {
                dispatch({
                    type: 'REGISTER_REQUEST'
                });
                fetchRequest('api/auth', 'PUT', JSON.stringify(data))
                    .then(response => dispatchFromFetch(response,  dispatch, 'REGISTER_SUCCESS', 'REGISTER_FAIL'))
            }
        }
        case 'LOGIN': {
            return (dispatch) => {
                dispatch({
                    type: 'LOGIN_REQUEST'
                });
                fetchRequest('api/auth', 'POST', JSON.stringify(data))
                    .then(response => dispatchFromFetch(response,  dispatch, 'LOGIN_SUCCESS', 'LOGIN_FAIL'));

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
                fetchRequest('api/auth', 'DELETE')
                    .then(response => dispatchFromFetch(response,  dispatch, 'LOGOUT'));
            }
        }

    }
}
