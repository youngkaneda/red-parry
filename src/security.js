const jwt = require('jsonwebtoken');

function encrypt(data) {
    return jwt.sign(data, process.env.VUE_APP_PASS);
}

function decrypt(token) {
    try {
        return jwt.verify(token, process.env.VUE_APP_PASS);
    } catch (err) {
        return token;
    }
}

export default {
    encrypt,
    decrypt,
};
