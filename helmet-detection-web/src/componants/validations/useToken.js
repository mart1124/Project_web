import { useState, useEffect } from 'react'

function getSessionStorageOrDefault(key, defaultValue) {
    const stored = sessionStorage.getItem(key);
    if (!stored) {
      return defaultValue;
    }
    return JSON.parse(stored);
  }

export default function useToken(key, defaultValue) {
    

    const [token, setToken] = useState(
        getSessionStorageOrDefault(key, defaultValue)
    );
    
    const [userRole, setUserRole] = useState(
      getSessionStorageOrDefault(key, defaultValue)
    );

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(token));
        sessionStorage.setItem(key, JSON.stringify(userRole));
    }, [key, token, userRole]);

    return ([token, setToken],[userRole, setUserRole]);
}




// const getToken = () => {
//     const tokenString = sessionStorage.getItem('token');
//     const userToken = JSON.parse(tokenString);
//     return userToken?.token
// };

// const [token, setToken] = useState(getToken());

// const saveToken = userToken => {
//     sessionStorage.setItem('token', JSON.stringify(userToken));
//     setToken(userToken.token);
// };

// useEffect(() => {

//     const saveToken = userToken => {
//         sessionStorage.setItem('token', JSON.stringify(userToken));
//         setToken(userToken.token);
//     };
// }, [key, value]);

// return {
//     setToken: saveToken,
//     token
// }