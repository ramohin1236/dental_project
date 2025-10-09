import { configureStore } from '@reduxjs/toolkit';
import authApi from './feature/auth/authApi';
import productsApi from './feature/products/productsApi';
import categoriesApi from './feature/category/CategoriesApi';
import brandApi from './feature/brand/brandApi';
import procedureApi from './feature/procedure/procedure';
import sliderApi from './feature/slider/sliderApi';
import blogApi from './feature/blog/blogApi';
import newsletterApi from './feature/newsletter/newsletterApi';
import singleAddressApi from './feature/address/addressApi';



export const store = configureStore({
    reducer: {
        [authApi.reducerPath] : authApi.reducer,
        auth: authReducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [brandApi.reducerPath]: brandApi.reducer,
        [procedureApi.reducerPath]: procedureApi.reducer,
        [sliderApi.reducerPath]: sliderApi.reducer,
        [blogApi.reducerPath]: blogApi.reducer,
        [newsletterApi.reducerPath]: newsletterApi.reducer,
        [singleAddressApi.reducerPath]: singleAddressApi.reducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, productsApi.middleware, categoriesApi.middleware, brandApi.middleware, procedureApi.middleware, sliderApi.middleware, blogApi.middleware, newsletterApi.middleware, singleAddressApi.middleware)
})