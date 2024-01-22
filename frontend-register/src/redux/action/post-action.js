import { GET_POST_DATA, GET_ALL_PRODUCTS } from "../types";

export const getPostAction = (data) => {
    return {
        type: GET_POST_DATA,
        payload: data
    };
};

export const getAllProducts = (data) => {
    return {
        type: GET_ALL_PRODUCTS,
        payload: data
    };
};