import { useState } from 'react';
import { loginFields } from "../constants/FormFields";
import Input from "./Input";
import FormExtra from "./FormExtra";
import FormAction from "./FormAction";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setTokens } from "./slices/authSlice.jsx";
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../interceptor/axiosInstance.jsx';

const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function Login() {
    const [loginState, setLoginState] = useState(fieldsState);
    const accessToken = useSelector((state) => state.auth.accessToken);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticateUser();
    }

    const authenticateUser = async () => {
        try {
            const response = await axiosInstance.post('/login', loginState, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            const data = response.data;

            if (response.status === 200) {
                toast.success('Login successful!');
                dispatch(setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken, email: data.email }));
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000);
                console.log("Login successful : ", data);
            } else {
                toast.error(data.message || 'Login failed. Please try again.');
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            if (error.response.data.message == 'Invalid credentials') {
                toast.error('Invalid credentials. Please try again.');
            } else {
                console.log(error.response.data.message);
                toast.error(error.response.data.message || 'Login failed. Please try again.');
                navigate('/sign-up');
            }
        }
    }

    return (
        <div className="mt-8 space-y-6">
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="-space-y-px">
                    {
                        fields.map(field =>
                            <Input
                                key={field.id}
                                handleChange={handleChange}
                                value={loginState[field.id]}
                                labelText={field.labelText}
                                labelFor={field.labelFor}
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                isRequired={field.isRequired}
                                placeholder={field.placeholder}
                            />

                        )
                    }
                </div>

                <FormExtra />
                <FormAction handleSubmit={handleSubmit} text="Login" />

            </form>
        </div>
    )
}