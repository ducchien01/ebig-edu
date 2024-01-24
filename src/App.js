import './App.css';
import './component/select2/select2.css';
import './styles/ds-typography.css';
import './styles/ds-skin.css';

import MainLayout from './screens/Main/main-layout';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

const checkToken = () => {
  // const token = localStorage.getItem('token');
  // if (token) return true;
  // return false;
  return true;
};


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/admin/*" element={checkToken() === true ? <MainLayout /> : <Navigate to={"/login"} replace />} />
        <Route path="/admin" element={<Navigate to={checkToken() === false ? "/login" : "/admin"} replace />} />

      </Routes>
    </BrowserRouter></>
  );
}

export default App;
