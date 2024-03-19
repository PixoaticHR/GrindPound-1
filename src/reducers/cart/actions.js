import { ADD_ALL_ITEMS_TO_CART, ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM } from "../constants";

export const addAllItemsToCart = (product) => ({
    type: ADD_ALL_ITEMS_TO_CART,
    payload: product,
});

export const addToCart = (product) => ({
    type: ADD_TO_CART,
    payload: product,
});

export const removeFromCart = (productId) => ({
    type: REMOVE_FROM_CART,
    payload: productId,
});

export const updateCartItem = (productId, quantity) => ({
    type: UPDATE_CART_ITEM,
    payload: { productId, quantity },
});