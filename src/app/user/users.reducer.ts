import { Action } from "redux";
import { GuestUser, User } from "./user.model";
import * as UserActions from './user.actions' 
import { AppState } from "../app.reducer";
import { createSelector } from "reselect";

export interface UserState {
    currentUser: User;
}

const initialState: UserState = {
    currentUser: GuestUser,
}

export const UserReducer = function(state: UserState = initialState, action: Action) : UserState {
    switch(action.type){
        case UserActions.SET_CURRENT_USER:
            const user: User = (<UserActions.SetCurrentUserAction>action).user;
            return {
                currentUser: user
            }
        default:
            return state;
    }
}

export const getUserState = (state: AppState): UserState => state.user;

export const getCurrentUser = createSelector(
    getUserState,
    (state: UserState) => state.currentUser
);