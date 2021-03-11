import { createStore, applyMiddleware } from 'redux';
import { ACTIONS } from "../actions/index";
import { standReducer } from "./index";

let getCatMiddlware = store => next => action => {
        if(typeof action === 'function' && action().type === ACTIONS.GET_PICTURE){
            fetch("https://api.thecatapi.com/v1/images/search?category_ids=1").then(data => data.json()).then(image => {
                store.dispatch({type: ACTIONS.CHANGE_PICTURE, url: image[0].url});
            });

            return;
        }
        
        next(action);
    }   


const store = createStore(standReducer, applyMiddleware(getCatMiddlware));

export default store;