import axios from "axios";
import { AWS_API_URL } from "../../constant";

export const getToken = () => {
    let token = localStorage.getItem('token');
    return token ? token.replace(/"/g, "") : null;
};

const axiosWithToken = async (url, data) => {
    const token = getToken();
    try {
        const response = await axios.post(AWS_API_URL + url, data, {
            headers: { Authorization: token }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteWithToken = async (url) => {
    const token = getToken();
    try {
        const response = await axios.delete(AWS_API_URL + url, {
            headers: { Authorization: token }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getWithToken = async (url) => {
    const token = getToken();
    try {
        const response = await axios.get(AWS_API_URL + url, {
            headers: { Authorization: token }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const patchWithToken = async (url, data) => {
    const token = getToken();
    try {
        const response = await axios.patch(AWS_API_URL + url, data, {
            headers: { Authorization: token }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createOrder = async (data) => {
    try {
        console.log('token ==> ', getToken());
        return await axiosWithToken('/orders', data);
    } catch (error) {
        throw error;
    }
};

// export const createOrder = async (data) => {
//     try {
//         const response = await axiosWithToken('/orders', data);
//         console.log('createOrder responce ==> ', response);
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// };

export const proceedPayment = async (data) => {
    try {
        const response = await axiosWithToken('/create/payment', data);
        console.log('proceedPayment ==> ', response);
        return response;
    } catch (error) {
        throw error;
    }
};

export const makeLivePayment = async (data) => {
    try {
        const response = await axiosWithToken('/create/payment', data);
        console.log('makeLivePayment ==> ', response);
        return response;
    } catch (error) {
        throw error;
    }
};

export const addItemsToCart = async (data) => {
    try {
        const response = await axiosWithToken('/carts', data);
        console.log('crete cart responce ==> ', response);
        return response;
    } catch (error) {
        throw error;
    };
};

export const fetchCartProducts = async () => {
    try {
        const response = await getWithToken(`/carts`);
        console.log('fetchCartProducts responce ==> ', response);
        return response;
    } catch (error) {
        throw error;
    };
};

export const deleteCartItem = async (data) => {
    try {
        const response = await deleteWithToken(`/carts/${data}`);
        console.log('deleteCartItem responce ==> ', response);
        return response;
    } catch (error) {
        throw error;
    };
};

export const updateCartProducts = async (id, data) => {
    try {
        const response = await patchWithToken(`/carts/${id}`, data);
        console.log('updateCartItem responce ==> ', response);
        return response;
    } catch (error) {
        throw error;
    };
};

export const orderHistory = async () => {
    try {
        const response = await getWithToken(`/orders`);
        console.log('orderHistory responce ==> ', response);
        return response;
    } catch (error) {
        throw error;
    };
};


function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => reject(false);
        document.body.appendChild(script);
    });
};

export const displayRazorpay = async (data) => {
    try {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            throw new Error("Razorpay SDK failed to load. Are you online?");
        }

        const { amount, order_id, name, email, contact, address, linkPage, setLoader,order_id_backend } = data;

        const options = {
            key: process.env.RAZORPAY_KEY_ID,
            amount: amount.toString(),
            currency: 'INR',
            name: "Grind Pound",
            description: "Test Transaction",
            image: 'https://img.freepik.com/premium-vector/colorful-eagle-logo-template_187497-27.jpg?w=1380',
            order_id: order_id,
            handler: async function (response) {
                setLoader(false);
                const paymentData = {
                    orderId: order_id_backend,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                    amount: amount,
                    pay: 'UPI',
                    address: address,
                    type: 'success'
                };
                console.log('payment response ==> ', paymentData);
                linkPage("/order_received", { state: paymentData });
            },
            prefill: {
                name: name,
                email: email,
                contact: contact
            },
            notes: {
                address: address
            },
            theme: {
                color: "#61dafb",
            },
            modal: {
                ondismiss: function () {
                    console.log('Payment modal closed by user.');
                    setLoader(false);
                }
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    } catch (error) {
        console.error('Error in displaying Razorpay:', error);
        // Handle error, show error message to the user, etc.
    }
};
