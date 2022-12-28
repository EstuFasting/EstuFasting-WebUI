import {combineReducers} from "redux";
import userReducer from "./reducers/userReducer";
import cateringReducer from "./reducers/cateringReducer";
import diningHallReducer from "./reducers/diningHallReducer";

const rootReducer = combineReducers({
    user: userReducer,
    caterings: cateringReducer,
    diningHalls: diningHallReducer
})

export default rootReducer;