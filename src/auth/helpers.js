import cookie from 'js-cookie';

// Set in browser cookie

export const setCookie = (key, value) => {
    if(window !== undefined){
        cookie.set(key, value,{expires: 1});
    }
}

// Remove cookie from the browser

export const removeCookie = (key) => {
    if(window !== undefined){
        cookie.remove(key,{expires: 1});
    }
}

// Get data from the stored Cookie

export const getCookie = (key) => {
    if(window !== undefined){
        return cookie.get(key)
    }
}

// Set in localstorage


export const setLocalStorage = (key, value) => {
    if(window !== undefined){
        localStorage.setItem(key, JSON.stringify(value))
    }
}

// Remove from localstorage


export const removeLocalStorage = (key) => {
    if(window !== undefined){
        localStorage.removeItem(key)
    }
}

// Authenticate user by passing data to cookie and localstorage during sigin

export const authenticate = (response, next) => {
    console.log(response)
    setCookie('token',response.data.token)
    setLocalStorage('user', response.data.user)
    next();
}

// Access user information from localstorage

export const isAuth = () =>{
    if(window !== undefined){
        const cookieChecked = getCookie('token');
        if(cookieChecked){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'))
            }else{
                return false;
            }
        }
    }
}

export const signOut = next => {
    removeCookie('token');
    removeLocalStorage('user');
    next();
}

export const updateUser = (response, next) => {
    console.log('UPDATE USER IN LOCALSTORAGE HELPERS', response);
    if (typeof window !== 'undefined') {
        let auth = JSON.parse(localStorage.getItem('user'));
        auth = response.data;
        localStorage.setItem('user', JSON.stringify(auth));
    }
    next();
};