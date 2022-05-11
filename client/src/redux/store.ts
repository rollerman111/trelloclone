import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import projectReducer from './slices/projectSlice'
import taskReducer from './slices/taskSlice'

const combinedReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    task: taskReducer,
});

const rootReducer = (state: any, action: any) => {
    if (action.type === 'auth/logout/fulfilled') {
        state = { ...state, project: undefined, task: undefined }
    }
    return combinedReducer(state, action);
};

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch