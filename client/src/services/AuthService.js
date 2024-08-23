import {$host} from "../http/index";

export default class AuthService {
    static async registration (name, forName, email, password) {
        return await $host.post('user/signup', {name, forName, email, password})
    }

    static async login (email, password) {
        return await $host.post('user/login', {email, password})
    }
    static async logout(){
        return await $host.post('user/logout')
    }
}