/**
 * Created by nikolaev on 20.10.16.
 */
export function dispatchFromFetch(response, dispatch, succ, err, customPayload) {
	let json = response.json();
	if (!response.ok) {
		json.then(error => {
			dispatch({
				type: err,
				payload: error
			});
		});
		return
	}
	json.then(data => {
		dispatch({
			type: succ,
			payload: customPayload == undefined ? data : customPayload
		})
	})
}

export function fetchRequest(url, type, data) {
	return fetch(url, {
		method: type,
		headers: {
			"Content-type": "application/json"
		},
		credentials: 'include',
		body: data
	})
}
