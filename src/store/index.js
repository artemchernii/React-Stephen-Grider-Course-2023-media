import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './slices/UsersSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { albumsApi } from './apis/albumsApi';
import { photosApi } from './apis/photosApi';
import { postsApi } from './apis/postsApi';

const store = configureStore({
    reducer: {
        users: usersReducer,
        [albumsApi.reducerPath]: albumsApi.reducer,
        [photosApi.reducerPath]: photosApi.reducer,
        [postsApi.reducerPath]: postsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(albumsApi.middleware)
            .concat(photosApi.middleware)
            .concat(postsApi.middleware);
    },
});

setupListeners(store.dispatch);

export { store };
export * from './thunks/fetchUsers';
export * from './thunks/addUser';
export * from './thunks/deleteUser';
export {
    useFetchAlbumsQuery,
    useAddAlbumMutation,
    useRemoveAlbumMutation,
} from './apis/albumsApi';
export {
    useFetchPhotosQuery,
    useAddPhotoMutation,
    useRemovePhotoMutation,
} from './apis/photosApi';
