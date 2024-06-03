import { Dispatch, UnknownAction, configureStore } from '@reduxjs/toolkit'
import accountReducer from './screen/module/account/reducer'

export const store = configureStore({
    reducer: {
        account: accountReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch