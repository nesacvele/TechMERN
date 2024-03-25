import { useState } from 'react';
import Input from '../Input/Input';
import Label from '../Label/Label';
import './RegisterForm.scss';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import Button from '../Button/Button';
import { checkEmailValidation } from '../../utils/checkEmailValidation';
import { register } from '../../services/userService';
import { useDispatch } from 'react-redux';
import { showLoader } from '../../store/loader/loaderSlice';
import { toast } from 'react-toastify';
import { showLoginForm } from '../../store/loginRegister/loginRegisterSlice';
import { FaArrowRightLong } from 'react-icons/fa6';

function RegisterForm() {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [isEmail, setIsEmail] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isUsername, setIsUsername] = useState(true);
    const [isPassword, setIsPassword] = useState(true);
    const [data, setData] = useState({
        email: '',
        username: '',
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
        !data.username ? setIsUsername(false) : setIsUsername(true);
        !checkEmailValidation(data.email) ? setIsEmailValid(false) : setIsEmailValid(true);

        if (!data.email || !data.username || !data.password || !checkEmailValidation(data.email)) return;

        dispatch(showLoader(true));
        const res = await register(data);
        dispatch(showLoader(false));
        if (res.status === 'success') {
            toast.success(res.message);
            dispatch(showLoginForm());
        } else {
            toast.error(res.message);
        }
    };

    return (
        <>
            <div className='register-form-wrapper'>
                <div className='content'>
                    <h3>Welcome to TechMERN shop</h3>
                    <p>
                        If already have account please{' '}
                        <span onClick={() => dispatch(showLoginForm())}>
                            Go to Login <FaArrowRightLong />
                        </span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className='register-form'>
                    <div className='input-wrapper'>
                        <Label htmlFor='email' color={isEmail ? isEmailValid : isEmail}>
                            {isEmail ? (isEmailValid ? 'Email' : 'Email is not valid') : 'Email is required'}
                        </Label>
                        <Input type='text' id='email' placeholder='email@example.com' onChange={handleChange} />
                    </div>
                    <div className='input-wrapper'>
                        <Label htmlFor='username' color={isUsername}>
                            {isUsername ? 'Username' : 'Username is required'}
                        </Label>
                        <Input type='text' id='username' placeholder='Choose your username' onChange={handleChange} />
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
                    <Button className='btn btn-primary'>Register</Button>
                </form>
            </div>
        </>
    );
}

export default RegisterForm;
