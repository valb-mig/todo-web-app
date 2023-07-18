export default function getToken(logged) {
    if (typeof window !== 'undefined' && window.localStorage.getItem('laravelSessionToken') && !logged) {
        return window.localStorage.getItem('laravelSessionToken');
    }
}