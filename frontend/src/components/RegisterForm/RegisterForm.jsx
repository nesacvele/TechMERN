import { useState } from 'react';
import Input from '../Input/Input';
import Label from '../Label/Label';
import './RegisterForm.scss';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import Button from '../Button/Button';
import { checkEmailValidation } from '../../utils/checkEmailValidation';
import { register } from '../../services/userService';

function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [isEmail, setIsEmail] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPassword, setIsPassword] = useState(true);
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

        // Logika za slanje na bekend
        const res = await register(data);
        if (res.status === 'success') {
            alert(res.message);
        }
        console.log(res, 'res sa fronta');
    };

    return (
        <>
            {console.log(data, 'data')}
            <form onSubmit={handleSubmit} className='register-form'>
                <div className='input-wrapper'>
                    <Label htmlFor='email' labelColor={isEmail ? isEmailValid : isEmail}>
                        {isEmail ? (isEmailValid ? 'Email' : 'Email is not valid') : 'Email is required'}
                    </Label>
                    <Input type='text' id='email' placeholder='email@example.com' onChange={handleChange} />
                </div>
                <div className='input-wrapper'>
                    <Label htmlFor='password' labelColor={isPassword}>
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
                <Button>Register</Button>
            </form>
        </>
    );
}

export default RegisterForm;
