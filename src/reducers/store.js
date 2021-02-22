import { createStore } from 'redux';
import { standReducer } from "./index";

const store = createStore(standReducer);

export default store;