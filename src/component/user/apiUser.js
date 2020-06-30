 //take the userid to make a get request ffrom the backend and we need the token for the request
 export const read = (Id, token) => {

    return fetch(`${process.env.REACT_APP_API_URL}/api/user/${Id}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    //response of the fetch
    .then(res => {
        return res.json()

    })
    .catch(err => console.log(err));
};