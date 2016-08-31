const initialState = {
  login: '',
  error: '',
  fetching: false
};

export default function user(state = initialState, action) {
  switch(action.type) {
    case "LOGIN_REQUEST":
      return { ...state, login: '', error: '', fetching: true };

    case "LOGIN_SUCCESS":
      return { ...state, login: action.payload.login, error: '', fetching: false };

    case "LOGIN_FAIL":
      return { ...state, error: action.payload.message };

    case "REGISTER_REQUEST":
      return { ...state, fetching: true };

    case "REGISTER_SUCCESS":
      return { ...state, login: action.payload.username, error: '', fetching: false };

    case "REGISTER_FAIL":
      return { ...state, error: action.payload, fetching: false };



    default:
      return state
  }
}
