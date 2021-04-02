import { SET_REDIRECT } from "../actions/loginRedirect";

export default function loginRedirect(state = "/", action) {
  switch (action.type) {
    case SET_REDIRECT:
      return action.path;
    default:
      return state;
  }
}
