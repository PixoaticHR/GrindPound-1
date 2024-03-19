import { post, deleteWithToken } from "../apiUtil";
import { AWS_API_URL } from "../../constant";

export const setPhoneNumber = (payload) => {
    return new Promise((resolve, reject) => {
        post(`${AWS_API_URL}/users`, payload)
            .then((response) => {
                return resolve({ success: true, receiveObj: response.data })
            })
            .catch((error) => {
                return reject({ success: false, receiveObj: error })
            });
    });
}
export const resendOTP = (payload) => {
    return new Promise((resolve, reject) => {
        post(`${AWS_API_URL}/users/resend_otp`, payload)
            .then((response) => {
                return resolve({ success: true, receiveObj: response.data })
            })
            .catch((error) => {
                return reject({ success: false, receiveObj: error })
            });
    });
}
export const verifyOTP = async (payload) => {
    return new Promise((resolve, reject) => {
        post(`${AWS_API_URL}/users/confirm_otp`, payload)
            .then((response) => {
                return resolve({ success: true, receiveObj: response.data })
            })
            .catch((error) => {
                return reject({ success: false, receiveObj: error })
            });
    });
}

export const logout = async () => {
    var token = await localStorage.getItem('token');
    if (token) {
        token = token.substring(1, token.length - 1);
    }
    return new Promise((resolve, reject) => {
        deleteWithToken(`${AWS_API_URL}/users/logout`, token)
            .then((response) => {
                return resolve({ success: true, receiveObj: response.data })
            })
            .catch((error) => {
                return reject({ success: false, receiveObj: error })
            });
    });
}