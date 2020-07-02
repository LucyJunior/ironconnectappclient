

export const create = (Id, token, post) => {

    return fetch(`${config.REACT_APP_API_URL}/api/post/new/${Id}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }, 
        body: post
    })
    .then(res => {
        return res.json()

    })
    .catch(err => console.log(err));
};

export const list = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/posts`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};