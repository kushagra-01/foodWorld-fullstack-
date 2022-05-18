import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { HomeReducer } from "./HomeReducer";



// thunk

const composeEnhancers =
    typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const middleware = [thunk]

const enhancer = composeEnhancers(
    applyMiddleware(...middleware),
    // other store enhancers if any
);


const rootReducer = combineReducers({
    Foodworld:HomeReducer
})

export const store = createStore(rootReducer, enhancer)