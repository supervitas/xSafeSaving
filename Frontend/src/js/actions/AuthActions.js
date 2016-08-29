/**
 * Created by nikolaev on 29.08.16.
 */
export function authAction(type, data) {
    return (dispatch) => {
        dispatch({
            type: type,
            payload: data
        });
    }
}
