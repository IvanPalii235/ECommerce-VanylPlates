import {ADMIN_ROUTE, CART_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, SONG_ROUTE, ORDERS_ROUTE, STATISTIC_ROUTE} from "./utils/consts";
import Admin from "./page/Admin";
import Cart from "./page/Cart";
import Auth from "./page/Auth";
import Shop from "./page/Shop";
import Order from "./page/Orders";
import SongPage from "./page/SongPage";
import Registration from "./page/SingUp";
import Statistics from "./page/Statistic"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path:ORDERS_ROUTE,
        Component: Order
    },
    {
        path:STATISTIC_ROUTE,
        Component: Statistics
    },
    {
        path: CART_ROUTE,
        Component: Cart
    },
]
export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    },
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: SONG_ROUTE + '/:id',
        Component: SongPage
    },
]