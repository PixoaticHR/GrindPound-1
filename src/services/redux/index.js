
export const setCartPayloadNewInStore = (productDetails,action) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_CART_PRODUCT',
            payload: {
               productDetails:productDetails,
               action:action
            }
        });
    }
}
export const cleenStore = () => {
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_CART',
        });
    }
}