import './Navigation.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { routesConfig } from '../../config/routesConfig';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrency } from '../../store/currency/currencySlice';
import { toggleLoginForm } from '../../store/loginRegister/loginRegisterSlice';
import { localStorageConfig } from '../../config/localStorageConfig';
import { IoIosArrowDown } from 'react-icons/io';
import { removeUser } from '../../store/user/userSlice';

function Navigation() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoginForm } = useSelector((state) => state.loginRegisterStore);
    const { currency } = useSelector((state) => state.currencyStore);
    const { symbol } = useSelector((state) => state.currencyStore);
    const { user } = useSelector((state) => state.userStore);

    useEffect(() => {
        localStorage.setItem(localStorageConfig.CURRENCY, currency);
    }, [currency]);

    const changeCurrency = (e) => {
        dispatch(setCurrency(e.target.value));
    };

    const toggleView = () => {
        dispatch(toggleLoginForm(!isLoginForm));
    };

    const userLogout = () => {
        localStorage.removeItem(localStorageConfig.USER);
        dispatch(removeUser());
        navigate(routesConfig.AUTHORIZATION.url);
    };

    const navigationView = () => {
        return localStorage.getItem(localStorageConfig.USER) ? (
            <div className='dropdown'>
                <li className='dropbtn'>
                    <a>
                        {user.username}
                        <IoIosArrowDown />
                    </a>
                </li>
                <div className='dropdown-content'>
                    <li>
                        <NavLink>Profile</NavLink>
                    </li>
                    {user.role === 'admin' && (
                        <li>
                            <NavLink to={routesConfig.DASHBOARD.url}>Dashboard</NavLink>
                        </li>
                    )}
                    <li onClick={userLogout}>
                        <a>Logout</a>
                    </li>
                </div>
            </div>
        ) : (
            <li>
                <NavLink to={routesConfig.AUTHORIZATION.url} onClick={toggleView}>
                    {isLoginForm ? 'Register' : 'Login'}
                </NavLink>
            </li>
        );
    };

    return (
        <>
            <header>
                <div className='container'>
                    <div className='navigation-wrapper'>
                        <div className='currency'>
                            <label htmlFor='currency'>Currency</label>
                            <select name='currency' id='currency' defaultValue={currency} onChange={changeCurrency}>
                                <option value='EUR'>EUR</option>
                                <option value='USD'>USD</option>
                                <option value='RSD'>RSD</option>
                            </select>
                            <span>{symbol}</span>
                        </div>
                        <div className='navigation'>
                            <nav>
                                <ul>
                                    <li>
                                        <NavLink to={routesConfig.SHOP.url}>Shop</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={routesConfig.CONTACT.url}>Contact</NavLink>
                                    </li>
                                    {navigationView()}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Navigation;
