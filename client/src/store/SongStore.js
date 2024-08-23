import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import jwt_decode from "jwt-decode";
import ProductService from "../services/ProductService";

export default class SongStore {
    constructor() {
        this._products = []
        this._sortParams = [
            {_id: 1, name: "Price by decline" , param: "sort_price", value: -1},
            {_id: 2, name: "Price by growth" , param: "sort_price", value: 1},
            {_id: 3, name: "Rating by decline" , param: "sort_rating", value: -1},
            {_id: 4, name: "Rating by growth" , param: "sort_rating", value: 1},
        ]
        this._selectedSort = {}
        this._minPrice = 0;
        this._minStock = 0;

        makeAutoObservable(this)
    }
    setProduct(products) {
        this._products = products;
    }

    setMinPrice(minPrice) {
        this._minPrice = minPrice;
    }
    setMinStock(minStock) {
        this._minStock = minStock;
    }

    setSelectedSort(selected_sort) {
        this._selectedSort = selected_sort
    }


    get sortParams() {
        return this._sortParams
    }
    get products() {
        return this._products
    }

    get selectedSort(){
        return this._selectedSort;
    }

    get minPrice(){
        return this._minPrice;
    }
    get minStock(){
        return this._minStock;
    }
}