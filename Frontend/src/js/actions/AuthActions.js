/**
 * Created by nikolaev on 29.08.16.
 */
import $ from "jquery";
export function authAction(type, data) {
    return (dispatch) => {
        dispatch({
            type: 'REGISTER_REQUEST'
        });
        $.ajax({
            type: 'POST',
            url: 'api/register',
            data: JSON.stringify(data),
            contentType: 'application/json'
        }).done(function (resData) {
            dispatch({
                type: 'REGISTER_SUCCESS',
                payload: JSON.parse(resData)
            })
        }).fail(function(resData) {
            dispatch({
                type: 'REGISTER_FAIL',
                payload: JSON.parse(resData.responseText)
            })
        });
    }
}
