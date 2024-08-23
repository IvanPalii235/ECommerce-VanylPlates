import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import userStore from "./store/UserStore";
import songStore from "./store/SongStore";
import cartStore from "./store/CartStore";

const root = ReactDOM.createRoot(document.getElementById("root"));

export const Context = createContext(null)

root.render(
    <Context.Provider value = {{
        user: new userStore(),
        product: new songStore(),
        cart: new cartStore()
    }}>
        <App />
    </Context.Provider>,
);

