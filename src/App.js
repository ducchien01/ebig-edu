import React from 'react';
import './App.css';
import './assets/skin/layout.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from './screen/layout/main-layout';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ConfigAPI from './config/configApi';
import { modules } from './assets/const/const-list';

function App() {
    return (
        <GoogleOAuthProvider clientId={ConfigAPI.ggClientId}>
            <ToastContainer />
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<MainLayout menu={modules} />} />
                </Routes>
            </BrowserRouter>
        </GoogleOAuthProvider>
    );
}

export default App;
