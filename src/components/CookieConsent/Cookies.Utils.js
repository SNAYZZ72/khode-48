import Cookies from 'js-cookie';

export const setCookie = (name, value) => {
    Cookies.set(name, value);
};

export const getCookie = (name) => {
    return Cookies.get(name);
};

export const deleteCookie = (name) => {
    Cookies.remove(name);
};

export const checkCookie = (name) => {
    return Cookies.get(name) !== undefined;
}

export const checkCookieConsent = () => {
    return Cookies.get('cookieConsent') === 'true';
}

export const setCookieConsent = (value) => {
    Cookies.set('cookieConsent', value);
}

export const checkCookieConsentAnalytics = () => {
    return Cookies.get('cookieConsentAnalytics') === 'true';
}

export const setCookieConsentAnalytics = (value) => {
    Cookies.set('cookieConsentAnalytics', value);
}

export const checkCookieConsentMarketing = () => {
    return Cookies.get('cookieConsentMarketing') === 'true';
}

export const setCookieConsentMarketing = (value) => {
    Cookies.set('cookieConsentMarketing', value);
}

export const checkCookieConsentNecessary = () => {
    return Cookies.get('cookieConsentNecessary') === 'true';
}

export const setCookieConsentNecessary = (value) => {
    Cookies.set('cookieConsentNecessary', value);
}

