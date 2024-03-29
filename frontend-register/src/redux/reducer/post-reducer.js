import { GET_POST_DATA, GET_ALL_PRODUCTS } from "../types";

const initialState = {
    post: [],
    allProduct: []
};

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POST_DATA: {
            return {
                ...state,
                post: action.payload
            };
        };

        case GET_ALL_PRODUCTS: {
            return {
                ...state,
                allProduct: action.payload
            };
        };

        default:
            return state;
    };
};