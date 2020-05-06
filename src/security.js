const crypto = require('crypto-js');

function encrypt(text) {
    return crypto.AES.encrypt(text, process.env.VUE_APP_PASS).toString();
}

function decrypt(text) {
    return crypto.AES.decrypt(text, process.env.VUE_APP_PASS).toString(crypto.enc.Utf8);
}

export default {
    encrypt,
    decrypt,
};
