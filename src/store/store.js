import { createStore } from "redux";
import reducer from '../reducers/reducer'
const storeValue = createStore(reducer);

export default storeValue;