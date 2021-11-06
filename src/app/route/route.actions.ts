import { Action, ActionCreator } from "redux";

export const SET_ROUTE = '[ROUTE] Set'
export interface SetRouteAction extends Action {
    path: string
}

export const setRoute: ActionCreator<SetRouteAction> = 
    (path) => ({
        type: SET_ROUTE,
        path: path
    });