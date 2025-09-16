import { configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const imagekitApi = createApi({
    reducerPath: "imagekitApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT }),
    endpoints: () => ({}),
});

export const store = configureStore({
    reducer: {
        [imagekitApi.reducerPath]: imagekitApi.reducer,
    },
    middleware: (getDefault) => getDefault().concat(imagekitApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


