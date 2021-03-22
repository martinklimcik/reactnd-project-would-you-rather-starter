import { ADD_QUESTION } from "../actions/questions";
import { RECEIVE_USERS } from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case ADD_QUESTION:
      const newState = { ...state };
      newState[action.question.author].questions.push(action.question.id);
      return newState;
    default:
      return state;
  }
}
