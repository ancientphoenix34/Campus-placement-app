import { legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from "./Reducers/authReducers";

const store = createStore(authReducer, composeWithDevTools());

export default store