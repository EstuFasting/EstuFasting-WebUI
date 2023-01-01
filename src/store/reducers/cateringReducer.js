import cateringProps from "../initialStates/cateringProps";
import {SYNC_CATERINGS, SYNC_MAIN_PAGE_CATERINGS} from "../actions/cateringActions";

const initialState = {
    cateringProps: cateringProps
}

export default function userReducer(state = initialState, {type, payload}) {

    switch (type) {
        case SYNC_CATERINGS:
            return {
                ...state,
                cateringProps: {
                    ...state.cateringProps,
                    caterings: [...payload]
                }
            }
        case SYNC_MAIN_PAGE_CATERINGS:
            return {
                ...state,
                cateringProps: {
                    ...state.cateringProps,
                    mainPageCaterings: [...payload]
                }
            }
        default:
            return state
    }
}