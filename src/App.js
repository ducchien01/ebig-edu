import React from 'react';
import './App.css';
import './assets/skin/layout.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from './screen/layout/main-layout';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ConfigAPI from './config/configApi';
import { eduExpertModules, modules, socialModules } from './assets/const/const-list';
import { CustomerController } from './screen/module/customer/controller';
import { CustomerType } from './screen/module/customer/da';

function App() {
    return (
        <GoogleOAuthProvider clientId={ConfigAPI.ggClientId}>
            <ToastContainer />
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<MainLayout menu={modules} />} />
                    <Route path="/" element={<Navigate to={"/social"} replace />} />
                    {/* <Route path="/social/*" element={<MainLayout menu={socialModules} />} />
                    <Route path="/ecomerce/*" element={<MainLayout menu={[]} />} />
                    {expertRole ? <Route path="/edu/*" element={<MainLayout menu={eduExpertModules} />} /> : null}
                    {expertRole ? <Route path="/edu" element={<Navigate to={"/edu/dashboard"} replace />} /> : null}
                    <Route path="/ecomerce" element={<Navigate to={"/ecomerce/home"} replace />} />
                    <Route path="/social" element={<Navigate to={"/social/home"} replace />} />
                    <Route path="/" element={<Navigate to={"/social/home"} replace />} />
                    <Route path="/*" element={<Navigate to={"/social/home"} replace />} /> */}
                </Routes>
            </BrowserRouter>
        </GoogleOAuthProvider>
    );
}

export default App;
