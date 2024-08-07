import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from './screen/layout/main-layout';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ConfigAPI from './config/configApi';
import { modules } from './assets/const/const-list';
import 'react-awesome-slider/dist/styles.css';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
    return (
        <Provider store={store} stabilityCheck="always">
            <GoogleOAuthProvider clientId={ConfigAPI.ggClientId}>
                <ToastContainer />
                <BrowserRouter>
                    <Routes>
                        <Route path="/*" element={<MainLayout menu={modules} />} />
                    </Routes>
                </BrowserRouter>
            </GoogleOAuthProvider>
        </Provider>
    );
}

export default App;
