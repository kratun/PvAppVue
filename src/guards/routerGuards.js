import { ADMIN_KEY } from '../secrets/ApiSecret'
export function notAuthGuard(to, from, next) {
    if (localStorage.getItem('token') !== null) {
        next();
    } else {
        next('/');
    }
}

export function authGuard(to, from, next) {
    if (localStorage.getItem('token') !== null) {
        next('/');
    } else {
        next();
    }
}

export function adminGuard(to, from, next) {
    if (localStorage.getItem('userId') === ADMIN_KEY) {
        next();
    } else {
        next('/');
    }
}