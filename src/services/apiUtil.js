import axios from 'axios';

const headers = {
    'Content-Type': 'application/json',
}

export const setLocalStorage = (key, obj) => {
    localStorage.setItem(key, JSON.stringify(obj));
};
export const getLocalStorage = (key) => {

    var value = localStorage.getItem(key);
    if (value === null) {
        return null;
    }
    return value ? JSON.parse(value) : null
};

export const get = (url) => {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                headers: headers
            }).then((response) => {
                return resolve(response);
            })
            .catch((error) => {
                return reject(error)
            });
    })
}

export const post = (url, data) => {
    return new Promise((resolve, reject) => {
        axios
            .post(url, data, {
                headers: headers
            })
            .then((response) => {

                return resolve(response);
            })
            .catch((error) => {
                return reject(error)
            });
    });

}

export const deleteWithToken = (url, token) => {

    return new Promise((resolve, reject) => {
        axios
            .delete(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
            .then((response) => {
                return resolve(response);
            })
            .catch((error) => {
                return reject(error)
            });
    });
}

export const postWithToken = (url, data, token) => {

    return new Promise((resolve, reject) => {
        axios
            .post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
            .then((response) => {
                return resolve(response);
            })
            .catch((error) => {
                return reject(error)
            });
    });
}
export const getWithToken = (url, token) => {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
            .then((response) => {
                return resolve(response);
            })
            .catch((error) => {
                return reject(error)
            });
    });

}
export const updateWithToken = (url, data, token) => {

    return new Promise((resolve, reject) => {
        axios
            .patch(url, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': token
                }
            })
            .then((response) => {
                return resolve(response);
            })
            .catch((error) => {
                return reject(error)
            });
    });

}