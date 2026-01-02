import { configureStore } from '@reduxjs/toolkit'

export const reduxStore = configureStore({
    reducer: {},
})

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof reduxStore.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof reduxStore.dispatch
export type AppStore = typeof reduxStore