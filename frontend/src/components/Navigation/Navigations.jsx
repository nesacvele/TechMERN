import './Navigation.scss';
import { NavLink } from 'react-router-dom';
import { routesConfig } from '../../config/routesConfig';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrency } from '../../store/currency/currencySlice';
import { toggleLoginForm } from '../../store/loginRegister/loginRegisterSlice';
import { localStorageConfig } from '../../config/localStorageConfig';

function Navigation() {
    const { isLoginForm } = useSelector((state) => state.loginRegisterStore);
    const { currency } = useSelector((state) => state.currencyStore);
    const { symbol } = useSelector((state) => state.currencyStore);
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.setItem(localStorageConfig.CURRENCY, currency);
    }, [currency]);

    const changeCurrency = (e) => {
        dispatch(setCurrency(e.target.value));
    };

    const toggleView = () => {
        dispatch(toggleLoginForm(!isLoginForm));
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
                                    <li>
                                        <NavLink to={routesConfig.AUTHORIZATION.url} onClick={toggleView}>
                                            {isLoginForm ? 'Register' : 'Login'}
                                        </NavLink>
                                    </li>
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
