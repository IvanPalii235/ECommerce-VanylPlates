import {makeAutoObservable} from "mobx";
import jwt_decode from "jwt-decode";
import axios from "axios";
import AuthService from "../services/AuthService";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._role = null
        makeAutoObservable(this)
    }
    isLoading = false;
    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }
    setRole(role) {
        this._role = role
    }
    setLoading(bool) {
        this.isLoading = bool;
    }

    get isAuth() {
        return this._isAuth
    }
    get getUser() {
        return this._user
    }
    get getRole() {
        return this._role
    }
    async registration(name, forName, email, password){
        try {
            const response = await AuthService.registration(name, forName, email, password);
            console.log(response)
            localStorage.setItem('token', response.data.tokens.accessToken);
            this.setUser(response.data.user);
            this.setIsAuth(true);
            this.setRole(response.data.user.role);
            return response.data.user
        } catch (e) {
            throw e
        }
    }

    async login(email, password) {
        try {
            const response = await AuthService.login(email, password);
            console.log(response)
            localStorage.setItem('token', response.data.tokens.accessToken);
            this.setUser(response.data.user);
            this.setIsAuth(true);
            this.setRole(response.data.user.role);
            return response.data.user
        } catch (e) {
            throw e
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setUser({})
            this.setIsAuth(false);
            this.setRole('');
        } catch (e) {
            throw e
        }
    }
    async checkAuth() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}user/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.tokens.accessToken);
            this.setUser(response.data.user);
            this.setIsAuth(true);
            this.setRole(response.data.user.role);
            return response.data.user
        } catch (e) {
            this.setUser({});
            this.setIsAuth(false);
            this.setRole(null);
            throw e
        }
    }
}