import React from 'react';
import './App.css';
import './assets/skin/layout.css';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from './screen/layout/main-layout';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ConfigAPI from './config/configApi';

function App() {
    return (
        <GoogleOAuthProvider clientId={ConfigAPI.ggClientId}>
            <ToastContainer />
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<MainLayout />}/>
                    <Route path="/" element={<Navigate to={"/edu-management/dashboard"} replace />} />
                </Routes>
            </BrowserRouter>
        </GoogleOAuthProvider>
    );
}

export default App;
