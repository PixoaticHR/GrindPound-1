import { get, post, postWithToken, getWithToken } from "./apiUtil";
import { AWS_API_URL } from "../constant";

export const getBaneerImg = () => {
    return new Promise((resolve, reject) => {
        get(`${AWS_API_URL}/banners`)
            .then((response) => {
                return resolve({ success: true, receiveObj: response.data })
            })
            .catch((error) => {
                return reject({ success: false, receiveObj: error })
            });
    });
}
export const getSubscribe = () => {
    return new Promise((resolve, reject) => {
        get(`${AWS_API_URL}/plan/list`)
            .then((response) => {
                return resolve({ success: true, receiveObj: response.data })
            })
            .catch((error) => {
                return reject({ success: false, receiveObj: error })
            });
    });
}

export const getFilterProduct = (payload) => {
    return new Promise((resolve, reject) => {
        post(`${AWS_API_URL}/home`, payload)
            .then((response) => {
                return resolve({ success: true, receiveObj: response.data })
            })
            .catch((error) => {
                return reject({ success: false, receiveObj: error })
            });
    });
}

export const getProduct = async (payload) => {
    return new Promise((resolve, reject) => {
        post(`${AWS_API_URL}/products/index`, payload)
            .then((response) => {
                return resolve({ success: true, receiveObj: response.data })
            })
            .catch((error) => {
                return reject({ success: false, receiveObj: error })
            });
    });
}

export const checkAvailableZip = async (payload) => {
    return new Promise((resolve, reject) => {
        post(`${AWS_API_URL}/products/check_availability`, payload)
            .then((response) => {
                return resolve({ success: true, receiveObj: response.data })
            })
            .catch((error) => {
                return reject({ success: false, receiveObj: error })
            });
    });
}

export const getProductDetails = async (id) => {
    return new Promise((resolve, reject) => {
        get(`${AWS_API_URL}/products/${id}`)
            .then((response) => {
                return resolve({ success: true, receiveObj: response.data })
            })
            .catch((error) => {
                return reject({ success: false, receiveObj: error })
            });
    });
}
export const addRating = async (payload) => {
    var token = await localStorage.getItem('token');
    if (token) {
        token = token.substring(1, token.length - 1);
    }
    return new Promise((resolve, reject) => {
        postWithToken(`${AWS_API_URL}/reviews`, payload, token)
            .then((response) => {
                return resolve({ success: true, receiveObj: response.data })
            })
            .catch((error) => {
                return reject({ success: false, receiveObj: error })
            });
    });
}
