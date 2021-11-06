import { combineReducers, Reducer } from "redux";
import { RouteReducer, RouteState } from "./route/router.reducer";
import { UserReducer, UserState } from "./user/users.reducer";

export interface AppState {
    user: UserState,
    router: RouteState,
}

const rootReducer: Reducer<AppState>  = combineReducers({
    user: UserReducer,
    router: RouteReducer,    
})

export default rootReducer;