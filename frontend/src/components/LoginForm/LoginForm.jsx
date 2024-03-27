import { FaArrowRightLong } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showRegisterForm } from '../../store/loginRegister/loginRegisterSlice';
import './LoginForm.scss';
import Label from '../Label/Label';
import Input from '../Input/Input';
import { useState } from 'react';
import { checkEmailValidation } from '../../utils/checkEmailValidation';
import Button from '../Button/Button';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { login } from '../../services/userService';
import { showLoader } from '../../store/loader/loaderSlice';
import { toast } from 'react-toastify';
import { routesConfig } from '../../config/routesConfig';
import { localStorageConfig } from '../../config/localStorageConfig';
import { setUser } from '../../store/user/userSlice';

function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isEmail, setIsEmail] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPassword, setIsPassword] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        const newData = { ...data };
        newData[id] = value;
        setData(newData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        !data.email ? setIsEmail(false) : setIsEmail(true);
        !data.password ? setIsPassword(false) : setIsPassword(true);
        !checkEmailValidation(data.email) ? setIsEmailValid(false) : setIsEmailValid(true);

        if (!data.email || !data.password || !checkEmailValidation(data.email)) return;

        dispatch(showLoader(true));
        const res = await login(data);
        dispatch(showLoader(false));
        console.log(res, 'res sa fronta LOGIN');
        if (res.status === 'success') {
            toast.success(res.message);
            localStorage.setItem(localStorageConfig.USER, JSON.stringify(res.user));
            dispatch(setUser(res.user));
            navigate(routesConfig.SHOP.url);
        } else {
            toast.error(res.message);
        }
    };

    return (
        <>
            <div className='login-form-wrapper'>
                <div className='content'>
                    <h3>We are glad to see you again :)</h3>
                    <p>
                        If you have no account please{' '}
                        <span onClick={() => dispatch(showRegisterForm())}>
                            Go to Register <FaArrowRightLong />
                        </span>
                    </p>
                </div>
                <form onSubmit={handleSubmit} className='login-form'>
                    <div className='input-wrapper'>
                        <Label htmlFor='email' color={isEmail ? isEmailValid : isEmail}>
                            {isEmail ? (isEmailValid ? 'Email' : 'Email is not valid') : 'Email is required'}
                        </Label>
                        <Input type='text' id='email' placeholder='email@example.com' onChange={handleChange} />
                    </div>
                    <div className='input-wrapper'>
                        <Label htmlFor='password' color={isPassword}>
                            {isPassword ? 'Password' : 'Password is required'}
                        </Label>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            placeholder='Type your password'
                            onChange={handleChange}
                        />
                        <span onClick={() => setShowPassword(!showPassword)}>{showPassword ? <IoEyeOff /> : <IoEye />}</span>
                    </div>
                    <Button className='btn btn-success'>Login</Button>
                </form>
            </div>
        </>
    );
}

export default LoginForm;
