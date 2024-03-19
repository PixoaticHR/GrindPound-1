import { updateWithToken, getWithToken ,post } from "../apiUtil";
import { AWS_API_URL } from "../../constant";

export const getProfileList = async () => {
    var token = await localStorage.getItem('token');
    if (token) {
        token = token.substring(1, token.length - 1);
    }
    return new Promise((resolve, reject) => {
        getWithToken(`${AWS_API_URL}/users/profile`,token)
            .then((response) => {
                return resolve({ success: true, receiveObj: response.data })
            })
            .catch((error) => {
                return reject({ success: false, receiveObj: error })
            });
    });
}
export const updateProfile = async (payload) => {
    var token = await localStorage.getItem('token');
    if (token) {
        token = token.substring(1, token.length - 1);
    }
    return new Promise((resolve, reject) => {
        updateWithToken(`${AWS_API_URL}/users/update`, payload,token)
            .then((response) => {
                return resolve({ success: true, receiveObj: response.data })
            })
            .catch((error) => {
                return reject({ success: false, receiveObj: error })
            });
    });
}
export const setUserProfile = async (payload) => {
    return new Promise((resolve, reject) => {
        post(`${AWS_API_URL}/users/account`, payload)
            .then((response) => {
                const obj = response?.data?.authorization;
                localStorage.clear();
                localStorage.setItem("token", JSON.stringify(obj));
                return resolve({ success: true, receiveObj: response.data })
            })
            .catch((error) => {
                return reject({ success: false, receiveObj: error })
            });
    });
}