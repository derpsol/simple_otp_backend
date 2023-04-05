const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.JWT_TOKEN_SECRET || '123change';

module.exports.sign = (payload) => {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        ...payload
    }, TOKEN_SECRET);
}

module.exports.verify = (token) => {
    try {
        return jwt.verify(token, TOKEN_SECRET);
    }
    catch {
        return null;
    }
}