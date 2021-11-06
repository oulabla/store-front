import { Location } from "@angular/common"
import { Action } from "redux";
import * as RouteActions from './route.actions' 
import { AppState } from "../app.reducer";
import { createSelector } from "reselect";
import { Inject } from "@angular/core";
import { Router } from "@angular/router";


export interface RouteState {
    current: string;
    history: Array<String>;
}

const initialState: RouteState = {
    current: '/home',
    history: [],
}



export const RouteReducer = function(state: RouteState = initialState, action: Action) : RouteState {
    switch(action.type){
        case RouteActions.SET_ROUTE:
            const path: string = (<RouteActions.SetRouteAction>action).path;
            return {
                current: path,
                history: [...state.history, state.current],
            }
        default:
            return state;
    }
}

export const getRouteState = (state: AppState): RouteState => state.router;

export const getCurrentRoute = createSelector(
    getRouteState,
    (state: RouteState) => state.current
);