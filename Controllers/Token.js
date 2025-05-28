const jwt = require('jsonwebtoken')
const {body, validationResult} = require('express-validator')
const asyncHandler = require('express-async-handler')

let refreshTokens = [];

const getAccessToken = (user) => {
    return jwt.sign({user}, 'secretkey', {expiresIn: '10h'});
};

const getRefreshToken = (user) => {
    return jwt.sign({user}, 'refreshsecretkey');
};

const refresh_token = asyncHandler(async (req, res, next) => {
    //token from user
    const refreshToken = req.body.token;
    //send error if there is no token or invalid
    if(!refreshToken) return res.status(403).json("You are not authenticated");
    if(refreshTokens.includes(refreshToken)){
        return res.status(403).json("refresh token is not valid");
    };
    jwt.verify(refreshToken, "refreshsecretkey", (err, user) => {
        err && console.log(err);
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

        const newAccessToken = getAccessToken(user);
        const newRefreshToken = getRefreshToken(user);

        refreshTokens.push(newRefreshToken);

        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        });
    });
});

module.exports = {refreshTokens, getAccessToken, getRefreshToken, refresh_token}