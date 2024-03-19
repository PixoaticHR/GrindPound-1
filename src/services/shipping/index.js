import { postWithToken, getWithToken ,deleteWithToken } from "../apiUtil";
import { AWS_API_URL } from "../../constant";

export const getAddressList = async () => {
    var token = await localStorage.getItem('token');
    if (token) {
        token = token.substring(1, token.length - 1);
    }
    return new Promise((resolve, reject) => {
        getWithToken(`${AWS_API_URL}/shipping_addresses`, token)
            .then((response) => {
                return resolve({ success: true, receiveObj: response.data })
            })
            .catch((error) => {
                return reject({ success: false, receiveObj: error })
            });
    });
}
export const setAddressList = async (payload) => {
    var token = await localStorage.getItem('token');
    if (token) {
        token = token.substring(1, token.length - 1);
    }
    return new Promise((resolve, reject) => {
        postWithToken(`${AWS_API_URL}/shipping_addresses`, payload, token)
            .then((response) => {
                return resolve({ success: true, receiveObj: response.data })
            })
            .catch((error) => {
                return reject({ success: false, receiveObj: error })
            });
    });
}
export const deleteAddress = async (id) => {
    var token = await localStorage.getItem('token');
    if (token) {
        token = token.substring(1, token.length - 1);
    }
    return new Promise((resolve, reject) => {
        deleteWithToken(`${AWS_API_URL}/shipping_addresses/${id}`, token)
            .then((response) => {
                return resolve({ success: true, receiveObj: response.data })
            })
            .catch((error) => {
                return reject({ success: false, receiveObj: error })
            });
    });
}