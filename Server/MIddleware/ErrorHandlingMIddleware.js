const ApiError = require('../Error/apiError')

module.exports = function (err, req, res, next) {
    console.log(err)
    if(err instanceof ApiError){
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json("Unexpected error!")
}