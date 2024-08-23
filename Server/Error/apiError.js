module.exports = class ApiError extends Error{
    status;
    errors;
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
    static UnauthorizedError(){
    }
    static BadRequest(message, errors = []){
        return new ApiError(400, message, errors);
    }
    static Forbidden(message, errors = []){
        return new ApiError(403, 'You dont have rules to do this!');
    }
}