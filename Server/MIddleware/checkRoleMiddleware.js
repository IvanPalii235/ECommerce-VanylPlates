const tokenService = require('../Services/tokenService')
const ApiError = require('../Error/apiError')

module.exports = function (role)
{
    return function (req, res, next) {
        try{
            const accessToken = req.headers.authorization.split(' ')[1];
            const userData = tokenService.validateAccessToken(accessToken);
            if(userData.role !== role){
                return next(ApiError.Forbidden());
            }
            next();
        }catch (e) {
            return next(ApiError.UnauthorizedError());
        }
    };
}

