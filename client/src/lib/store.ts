import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import authReducer, {authActions} from "./features/authSlice"
import linkReducer from "./features/linksSlice"
import publicReducer from "./features/publicSlice"

export const store = configureStore({
  reducer: {
    auth:authReducer,
    links: linkReducer,
    public: publicReducer
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()


const init = () => {
  store.dispatch(authActions.getUser(null))
}

init();