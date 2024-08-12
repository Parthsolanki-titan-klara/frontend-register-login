import { useState } from 'react';
import { loginFields } from "../constants/FormFields.js";
import Input from "./Input";
import FormExtra from "./FormExtra.js";
import FormAction from "./FormAction.js";
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';


const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){
    const [loginState,setLoginState]=useState(fieldsState);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        authenticateUser();
    }

    //Handle Login API Integration here
    const authenticateUser = async () =>{
        try {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
      
            const response = await fetch('http://localhost:8080/api/v1/login', {
              method: 'POST',
              headers: headers,
              body: JSON.stringify(loginState),
              mode: 'cors',
              credentials: 'include'
            });
      
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
      
            const data = await response.json();
            console.log('Success:', data);
            setSuccessMessage('Login successful!');
            // Handle success (e.g., store the token, redirect to another page, etc.)
            // For example, redirect to the dashboard
            setTimeout(() => {
              navigate('/dashboard');
            }, 1000);
          } catch (error) {
            console.error('Error:', error);
            // Handle error (e.g., show an error message to the user)
          }
    }



    return(
        <div className="mt-8 space-y-6">
          {successMessage && (
        <div style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 1000 }}>
          <Alert variant="filled" severity="success">
          {successMessage}
          </Alert>
        </div>
      )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
            {
                fields.map(field=>
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

        <FormExtra/>
        <FormAction handleSubmit={handleSubmit} text="Login"/>

      </form>
      </div>
    )
}