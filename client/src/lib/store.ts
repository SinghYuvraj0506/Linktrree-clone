import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import authReducer, {authActions} from "./features/authSlice"
import linkReducer, { linkActions } from "./features/linksSlice"
import publicReducer from "./features/publicSlice"
import appearanceReducer, { appearanceActions } from "./features/appearanceSlice"

export const store = configureStore({
  reducer: {
    auth:authReducer,
    links: linkReducer,
    public: publicReducer,
    appearance: appearanceReducer
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()


export const updateAppearance = (data:any) => {
  store.dispatch(appearanceActions.updateData(data))
}

const init = () => {
  store.dispatch(authActions.getUser(null))
  store.dispatch(linkActions.getAllUserLinks(null))
}

init();