import axios from 'axios';

export const register = async (user) => {
    try {
        const res = await axios.post('/api/user/register', user);
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                message: res.data.message,
            };
        }
        return {
            status: res.data.err.status,
            message: res.data.message,
        };
    } catch (err) {
        return {
            status: err.response.data.err.status,
            message: err.response.data.message,
        };
    }
};

export const login = async (user) => {
    try {
        const res = await axios.post('/api/user/login', user);
        console.log(res, 'res iz servisa LOGIN');
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                user: res.data.user,
            };
        }
        return {
            status: res.data.err.status,
            message: res.data.message,
        };
    } catch (err) {
        console.log(err, 'greska iz servisa LOGIN');
        return {
            status: err.response.data.err.status,
            message: err.response.data.message,
        };
    }
};
