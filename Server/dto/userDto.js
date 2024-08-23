module.exports = class UserDto {
    email;
    _id;
    role;

    constructor(model) {
        this.email = model.email;
        this._id = model._id;
        this.role = model.role
    }
}