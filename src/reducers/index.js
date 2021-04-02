import { combineReducers } from "redux";
import authedUser from "./authedUser";
import users from "./users";
import questions from "./questions";
import loginRedirect from "./loginRedirect";

export default combineReducers({ authedUser, users, questions, loginRedirect });
