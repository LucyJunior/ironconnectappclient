import config from '../../config'

export const create = (Id, token, post) => {

    return fetch(`${config.REACT_APP_API_URL}/api/post/new/${Id}`, {
        method: "POST",
        // headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json"
        // }, 
        body: post
    })
    .then(res => {
        return res.json()

    })
    .catch(err => console.log(err));
};

export const list = () => {
    return fetch(`${config.REACT_APP_API_URL}/api/posts`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const singlePost = postId => {
    return fetch(`${config.REACT_APP_API_URL}/api/post/${postId}`, {
        method: "GET"
    })
        .then(response => {
            let responseJson = response.json()
            console.log('Post details', responseJson)
            fetch(`${config.REACT_APP_API_URL}/post/photo/${postId}`)
                .then((res) => {
                    console.log('Image photo', res)
                })
            return responseJson
        })
        .catch(err => console.log(err));
};

export const listByUser = (userId, token) => {
    return fetch(`${config.REACT_APP_API_URL}/api/posts/by/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const remove = (postId, token) => {
    return fetch(`${config.REACT_APP_API_URL}/api/post/${postId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};