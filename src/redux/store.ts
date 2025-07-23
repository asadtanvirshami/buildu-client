import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, Persistor } from "redux-persist";
import storage from "redux-persist/lib/storage";
// Reducers
import userReducer from "./slices/user/user-slice";
import statusReducer from "./slices/status/status-slice";
import taskReducers from "./slices/task/task-slice";

// Persist config for redux-persist
const persistConfig = {
  key: "root",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

// Root reducer
const rootReducer = combineReducers({
  user: persistedUserReducer,
  status: statusReducer,
  task: taskReducers,
});

// Configuring the Redux store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

const persistor = persistStore(store);

// Explicitly define types for store and persistor
export { store, persistor };
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store; // Type for store
export type AppPersistor = Persistor; // Type for persistor
export type AppDispatch = typeof store.dispatch; // This gets the dispatch type from the store
