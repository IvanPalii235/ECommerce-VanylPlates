import {makeAutoObservable} from "mobx";

export default class CartStore {
    constructor() {
        this._id = '';
        this._subTotal = 0;
        this._items = [];
        makeAutoObservable(this)
    }
    setId(id) {
        this._id = id;
    }
    setTotal(totalPrice) {
        this._subTotal = totalPrice;
    }
    setCartItems(items) {
        this._items = items
    }
    get getTotalPrice() {
        return this._subTotal
    }
    get getItems() {
        return this._items
    }
    get getId() {
        return this._id
    }
}