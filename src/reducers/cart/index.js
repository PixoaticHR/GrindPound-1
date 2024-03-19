import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM, ADD_ALL_ITEMS_TO_CART } from "../constants";


const initialState = {
    cart: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ALL_ITEMS_TO_CART:
            return {
                ...state,
                cart: action.payload
            };
        case ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, { ...action.payload, quantity: 1 }]
            };
        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload),
            };
        case UPDATE_CART_ITEM:
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.payload.productId ? { ...item, quantity: action.payload.quantity } : item
                ),
            };
        default:
            return state;
    }
};

export default cartReducer;