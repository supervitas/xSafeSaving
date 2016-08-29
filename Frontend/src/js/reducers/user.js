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

    case "REGISTER_SUCCESS":
      return { ...state, name: action.payload, error: '' };

    case "REGISTER_FAIL":
      return { ...state, name: action.payload, error: '' };

    default:
      return state
  }
}
