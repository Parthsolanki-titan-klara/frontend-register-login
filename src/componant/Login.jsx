import { useState } from 'react';
import { loginFields } from "../constants/FormFields";
import Input from "./Input";
import FormExtra from "./FormExtra";
import FormAction from "./FormAction";
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setTokens } from "./slices/authSlice.jsx";
import { useDispatch, useSelector } from 'react-redux';

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

    //Handle Login API Integration here
    const authenticateUser = async (event) => {
        try {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');

            const response = await fetch(import.meta.env.VITE_LOGIN_API, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(loginState),
                mode: 'cors',
                credentials: 'include'
            });

            const data = await response.json();
            if (!response.ok) {
                toast.error(data.message || 'Login failed. Please try again.');
                throw new Error('Network response was not ok');
            }


            console.log('Success:', data);
            dispatch(setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken, email: data.email }));
            toast.success('Login successful!');
            setTimeout(() => {
                navigate('/dashboard');
            }, 1000);
        } catch (error) {
            console.error('Error:', error);        }
    }

    if (accessToken) {
        return <Navigate to="/dashboard" />
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