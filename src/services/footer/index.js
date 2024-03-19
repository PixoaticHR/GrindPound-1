import { post, get } from "../apiUtil";
import { AWS_API_URL } from "../../constant";

export const getFaq = () => {
    return new Promise((resolve, reject) => {
        get(`${AWS_API_URL}/faqs`)
            .then((response) => {
                return resolve({ success: true, receiveObj: response.data })
            })
            .catch((error) => {
                return reject({ success: false, receiveObj: error })
            });
    });
}

export const getBlogList = () => {
    return new Promise((resolve, reject) => {
        get(`${AWS_API_URL}/blogs`)
            .then((response) => {
                return resolve({ success: true, receiveObj: response.data })
            })
            .catch((error) => {
                return reject({ success: false, receiveObj: error })
            });
    });
}

export const getBlogShow = (id) => {
    return new Promise((resolve, reject) => {
        get(`${AWS_API_URL}/blogs/${id}`)
            .then((response) => {
                return resolve({ success: true, receiveObj: response.data })
            })
            .catch((error) => {
                return reject({ success: false, receiveObj: error })
            });
    });
}

export const getOurStoryList = () => {
    return new Promise((resolve, reject) => {
        get(`${AWS_API_URL}/our_stories`)
            .then((response) => {
                return resolve({ success: true, receiveObj: response.data })
            })
            .catch((error) => {
                return reject({ success: false, receiveObj: error })
            });
    });
}
export const getOurStoryShow = (id) => {
    return new Promise((resolve, reject) => {
        get(`${AWS_API_URL}/our_stories/${id}`)
            .then((response) => {
                return resolve({ success: true, receiveObj: response.data })
            })
            .catch((error) => {
                return reject({ success: false, receiveObj: error })
            });
    });
}