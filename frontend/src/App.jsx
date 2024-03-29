import { Route, Routes, useLocation } from 'react-router-dom';
import ShopPage from './pages/Shop/ShopPage';
import ContactPage from './pages/Contact/ContactPage';
import AuthorizationPage from './pages/Authorization/AuthorizationPage';
import { routesConfig } from './config/routesConfig.js';
import Navigation from './components/Navigation/Navigations';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './config/axiosConfig.js';
import Loader from './components/Loader/Loader.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { localStorageConfig } from './config/localStorageConfig.js';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './store/user/userSlice.js';
import DashboardPage from './pages/Dashboard/DashboardPage.jsx';
import AdminProtect from './adminComponents/AdminProtect/AdminProtect.jsx';
import { showDashboard } from './store/dashboard/dashboardSlice.js';

function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { isDashboard } = useSelector((state) => state.dashboardStore);

    // * Postavljamo usera u Redux ukoliko je logovan a korisnik je realoadovao aplikaciju
    useEffect(() => {
        const userString = localStorage.getItem(localStorageConfig.USER);
        if (userString) dispatch(setUser(JSON.parse(userString)));
    }, [dispatch]);

    // * Togglujemo Navigaciju u odnosu na to da li smo na Dashboardu
    useEffect(() => {
        if (location.pathname === '/dashboard') dispatch(showDashboard(true));
        else dispatch(showDashboard(false));
    }, [location, dispatch]);

    return (
        <>
            <Loader />
            {!isDashboard && <Navigation />}
            <Routes>
                <Route path={routesConfig.SHOP.url} element={<ShopPage />} />
                <Route path={routesConfig.CONTACT.url} element={<ContactPage />} />
                <Route path={routesConfig.AUTHORIZATION.url} element={<AuthorizationPage />} />
                <Route
                    path={routesConfig.DASHBOARD.url}
                    element={
                        <AdminProtect>
                            <DashboardPage />
                        </AdminProtect>
                    }
                />
            </Routes>
            <ToastContainer />
        </>
    );
}

export default App;
