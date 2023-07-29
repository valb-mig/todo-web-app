export default function getToken(logged = null) {

    let token = window.localStorage.getItem('laravelSessionToken');

    if(logged !== null){

        if (typeof window !== 'undefined' && token && !logged) {
            return token;
        }
    }

    if(token){
        return token;
    }

    return false;
}