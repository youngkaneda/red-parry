export default {
    scopes: ['openid', 'profile', 'email', 'https://www.googleapis.com/auth/youtube.readonly'].join(' '),
    clientId: process.env.VUE_APP_CLIENT_ID,
    clientSecret: process.env.VUE_APP_CLIENT_SECRET,
    redirectURI: process.env.VUE_APP_REDIRECT_URI,
    apiKey: process.env.VUE_APP_KEY,
    fbApiKey: process.env.VUE_APP_FB_KEY,
    fbClientId: process.env.VUE_APP_FB_CLIENT_ID,
};
