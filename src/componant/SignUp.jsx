import { useState } from 'react';
import { signupFields } from "../constants/FormFields"
import FormAction from "./FormAction";
import Input from "./Input";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import axiosInstance from '../interceptor/axiosInstance';

const fields = signupFields;

let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');

export default function SignUp() {
  const [signupState, setSignupState] = useState(fieldsState);

  const handleChange = (e) => setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration form : ", signupState);
    createAccount()
    console.log("Account created successfully");

  }

  // create account function 
  const createAccount = async () => {
    try {
      const response = await axiosInstance.post('/register', signupState, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      const data = response.data;
      console.log("Registration response : ", data);

        toast.success('Registration successful!');
        setTimeout(() => {
          navigate('/');
        }, 1000);
        console.log("Account created successfully : ", data);
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message || 'Registration failed. Please try again.');
      navigate('/'); //Redirect to login page
    }
  }

  return (
    <div className="mt-8 space-y-6">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
          {
            fields.map(field =>
              <Input
                key={field.id}
                handleChange={handleChange}
                value={signupState[field.id]}
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
          <FormAction handleSubmit={handleSubmit} text="Signup" />
        </div>
      </form>
    </div>
  )
}