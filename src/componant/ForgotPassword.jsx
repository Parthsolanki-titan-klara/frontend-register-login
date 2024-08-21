import { useState } from 'react';
import { loginFields, resetPasswordFields } from "../constants/FormFields.js";
import Input from "./Input.jsx";
import FormExtra from "./FormExtra.jsx";
import FormAction from "./FormAction.jsx";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearTokens, setTokens } from "./slices/authSlice.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { Header } from './Header.jsx';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';


const fields = resetPasswordFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function ForgotPassword() {
    const [resetPasswordState, setResetPasswordState] = useState(fieldsState);
    const accessToken = useSelector((state) => state.auth.accessToken);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticateUser();
    }

    const handleChange = (e) => {
        setResetPasswordState({ ...resetPasswordState, [e.target.id]: e.target.value })
    }

    //Handle Login API Integration here
    const authenticateUser = async () => {
        try {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', `Bearer ${accessToken}`);
            const response = await fetch(import.meta.env.VITE_RESET_PASSWORD_API, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(resetPasswordState),
                mode: 'cors',
                credentials: 'include'
            });

            console.log('Request Headers:', response.headers);
            const data = await response.json();
            console.log('Response:', data);
            
            if(!response.ok){
                toast.error(data.message || 'Password reset failed. Please try again.');
                throw new Error('Network response was not ok');
            }


            console.log('Success:', data);
            toast.success('Password reset successful!');
            dispatch(clearTokens({ accessToken: null, refreshToken: null }));
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (error) {
            console.error('Error during password reset:', error);
        }
    }

    const handleResetPassword = () => {
        if (accessToken) {
            navigate('/reset-password');
        } else {
            navigate('/sign-up');
        }
    };

    return (
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="bg-white shadow-xl rounded-lg p-8">
                    <Header
                        heading="Set new password"
                        paragraph="Must be at least 8 characters long"
                        linkName=""
                        linkUrl=""
                    />
                    <div className="mt-8 space-y-6">
                        <form className="mt-8 space-y-6"  onSubmit={handleSubmit}>
                            <div className="-space-y-px">
                                {
                                    fields.map(field =>
                                        <Input
                                            key={field.id}
                                            handleChange={handleChange}
                                            value={resetPasswordState[field.id]}
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
                            <FormAction handleSubmit={handleResetPassword} text="Reset Password" />
                            <p className="mt-2 text-center text-sm text-gray-600 mt-5">
                                <Link to='/dashboard' className="font-medium text-indigo-500 hover:text-indigo-500">
                                    <KeyboardBackspaceIcon className="mr-1" />
                                    Back to dashboard
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}