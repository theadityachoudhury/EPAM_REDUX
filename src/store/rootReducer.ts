import { combineReducers } from "@reduxjs/toolkit";
import coursesReducer from "./courses/reducer";
import authorsReducer from "./authors/reducer";
import userReducer from "./user/reducer";

const rootReducer = combineReducers({
    courses: coursesReducer, // Key must match your state slice names
    authors: authorsReducer,
    user: userReducer,
});

export default rootReducer;
