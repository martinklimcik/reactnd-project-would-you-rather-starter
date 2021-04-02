export const SET_REDIRECT = "SET_LOGIN_REDIRECT";

export function setLoginRedirect(path) {
  return {
    type: SET_REDIRECT,
    path,
  };
}
