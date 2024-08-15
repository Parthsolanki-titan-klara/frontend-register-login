import { useState } from 'react';
import { signupFields } from "../constants/FormFields"
import FormAction from "./FormAction";
import Input from "./Input";
import { useNavigate } from 'react-router-dom';
import { data } from 'autoprefixer';
import { toast } from 'react-toastify';

const fields=signupFields;

let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function SignUp(){
  const [signupState,setSignupState]=useState(fieldsState);

  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

  const navigate = useNavigate();

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log("Registration form : ",signupState);
    createAccount()
    console.log("Account created successfully");
    
  }

  //handle Signup API Integration here
  const createAccount= async()=>{
    try {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');


      const response = await fetch('http://localhost:8080/api/v1/register', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(signupState),
        mode: 'cors',
        credentials: 'include'
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || 'Registration failed. Please try again.');
        throw new Error('Network response was not ok');
      }

      console.log('response :', response);
      
      
      console.log('Success:', data);
      console.log('accessToken:', data.accessToken);
      
      toast.success('Registration successful!');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      console.error('error mesage :' , error);
      console.log('error mesage :' , data.message);
    }
  }

    return(
      <div className="mt-8 space-y-6">
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
        {
                fields.map(field=>
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