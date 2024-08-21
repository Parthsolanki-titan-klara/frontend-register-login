export const loginFields=[
    {
        labelText:"Email address",
        labelFor:"email",
        id:"email",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email address"   
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Password"   
    }
]


export const signupFields=[
    {
        labelText:"FirstName",
        labelFor:"FirstName",
        id:"firstName",
        name:"firstName",
        type:"text",
        autoComplete:"firstName",
        isRequired:true,
        placeholder:"firstName"   
    },
    {
        labelText:"Lastname",
        labelFor:"lastname",
        id:"lastName",
        name:"lastname",
        type:"text",
        autoComplete:"lastname",
        isRequired:true,
        placeholder:"lastname"   
    },
    {
        labelText:"Email address",
        labelFor:"email",
        id:"email",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email address"   
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Password"   
    },
    {
        labelText: "Role",
        labelFor: "role",
        id: "role",
        name: "role",
        type: "select",
        autoComplete: "role",
        isRequired: true,
        placeholder: "Role",
        options: [
            { value: "ADMIN", label: "Admin" },
            { value: "USER", label: "User" }
        ]
    }
]


export const resetPasswordFields = [
    {
        labelText: "New Password",
        labelFor: "newPassword",
        id: "newPassword",
        name: "newPassword",
        type: "password",
        autoComplete: "newPassword",
        isRequired: true,
        placeholder: "New Password"
    },
    {
        labelText: "Confirm Password",
        labelFor: "confirmPassword",
        id: "confirmPassword",
        name: "confirmPassword",
        type: "password",
        autoComplete: "confirmPassword",
        isRequired: true,
        placeholder: "Confirm Password"
    }
];
