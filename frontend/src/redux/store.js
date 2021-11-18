import { createStore, combineReducers } from "redux"
import userReducer from './reducers/userReducer'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const reducers = combineReducers({
  userInfo: userReducer
})
const persistConfig = {
  key: 'react-app-root',
  storage: storage,
  stateReconciler: autoMergeLevel2 // 查看 'Merge Process' 部分的具体情况
};
const myPersistReducer = persistReducer(persistConfig, reducers)
const store = createStore(
  myPersistReducer,
  // initStore 可以放一个initStore 不知道干嘛的
)
export const persistor = persistStore(store)
export default store