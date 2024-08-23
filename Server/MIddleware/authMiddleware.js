const ApiError = require('../Error/apiError');
const tokenService = require('../Services/tokenService');

module.exports =  (req, res, next) =>{
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return next(ApiError.UnauthorizedError());
        }
        const accessToken = authHeader.split(' ')[1];
        if(!accessToken){
            return next(ApiError.UnauthorizedError());
        }
        const userData = tokenService.validateAccessToken(accessToken);
        if(!userData){
            return next(ApiError.UnauthorizedError());
        }
        req.userData = userData;
        next();
    }catch (e) {
        return next(ApiError.UnauthorizedError());
    }
}