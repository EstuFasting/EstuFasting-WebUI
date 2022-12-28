import diningHallProps from "../initialStates/diningHallProps";
import {SYNC_DINING_HALLS} from "../actions/diningHallActions";

const initialState = {
    diningHallProps: diningHallProps
}

export default function userReducer(state = initialState, {type, payload}) {

    switch (type) {
        case SYNC_DINING_HALLS:
            return {
                ...state,
                diningHallProps: {
                    ...state.diningHallProps,
                    diningHalls: [...payload]
                }
            }
        default:
            return state
    }
}