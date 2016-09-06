const initialState = {
  login: '',
  error: '',
  fetching: false
};

export default function user(state = initialState, action) {
  switch(action.type) {
    case "AUTH_CHECK_REQUEST":
      return { ...state, fetching: true };

    case "AUTH_CHECK_FINISHED":
      return { ...state, fetching: false, login: action.payload.username };

    case "LOGIN_REQUEST":
      return { ...state, fetching: true };

    case "LOGIN_SUCCESS":
      return { ...state, login: action.payload.username, error: '', fetching: false };

    case "LOGIN_FAIL":
      return { ...state, fetching: false, error: action.payload };

    case "REGISTER_REQUEST":
      return { ...state, fetching: true };

    case "REGISTER_SUCCESS":
      return { ...state, login: action.payload.username, error: '', fetching: false };

    case "REGISTER_FAIL":
      return { ...state, error: action.payload, fetching: false };

    case "LOGOUT":
      return { ...state, login:'', fetching: false };

    case "REMOVE_ERROR":
      return { ...state, error:'' };

    default:
      return state
  }
}
