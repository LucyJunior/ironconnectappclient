

export const signup = user => {


    return fetch(`${process.env.REACT_APP_API_URL}/signup`, {
       method: "POST",
        headers: {
            Accept: "application/json",
           "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));

};


export const signin = user => {

    return fetch(`${process.env.REACT_APP_API_URL}/signup`, {
       method: "POST",
        headers: {
            Accept: "application/json",
           "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));

};

export const authenticate = (jwt, next) => {

    //will store the token in the local storage and then handle the call back 


      if(typeof window !== "undefined") {
          localStorage.setItem("jwt", JSON.stringify(jwt));
          next();

      }
  };

  export const signout = (next) => {
    //will remove in the client side the jwt
    if (typeof window !== "undefined") localStorage.removeItem("jwt");
    next();
    //once we remove it, redirect the user
    return fetch(`${process.env.REACT_APP_API_URL}/signup`, {
        method: "GET"
    })
        .then(response => {
            console.log('signout', response)
            return response.json();
        })

        .catch(err => console.log(err))

};

//take if the user 

export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false;
    }

    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    } else {
        return false;
    }
};

