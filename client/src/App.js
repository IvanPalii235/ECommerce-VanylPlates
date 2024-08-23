import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {Spinner} from "react-bootstrap";

const App = () => {
  const {user} = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            user.setLoading(true)
            user.checkAuth().then(response => {
                if(response){
                    user.setLoading(false)
                }
            }).finally(() => {
                user.setLoading(false)
            })
        }
    }, [])

    if (user.isLoading) {
        return <Spinner animation={'grow'}/>
    }

  return (
      <BrowserRouter>
        <NavBar />
        <AppRouter/>
      </BrowserRouter>
  );
};

export default observer(App);
