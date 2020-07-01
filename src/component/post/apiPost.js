

// export const create = (Id, token, post) => {

//     return fetch(`${process.env.REACT_APP_API_URL}/api/post/new/${Id}`, {
//         method: "POST",
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`
//         }, 
//         body: post
//     })
//     .then(res => {
//         return res.json()

//     })
//     .catch(err => console.log(err));
// };