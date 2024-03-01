import { useState } from "react";

const RegisterForm = () => {

    const [ registerData, setRegisterData ] = useState({
        userName:'',
        email:'',
        password:''
        })

    const handleChange = (event) => {
        const { name, value } = event.target;
        // setRegisterData({ ...registerData, [name]: value })
        setRegisterData({ ...registerData, [name]: value })
        console.log(name, value);
    } 

    const handleRegister = (event) => {
        event.preventDefault();
        fetch(`http://localhost:2001/register/set`, {
            headers: { 
                "Content-Type": "application/json" 
            },
            method:'POST', 
            body: JSON.stringify(registerData)
        })
        .then((response) => {
            if(!response.ok)
            {
                throw new Error("Error Found");
            } 
            return response.json();
        }) 
        .then((data) => {
            setRegisterData(data);
            console.log(data);
        })
    }   

    return(
        <div>
          <form onSubmit={handleRegister}>
                <label>Username</label>
                <input type="text" name='userName' value={registerData.userName} onChange={handleChange} />
                <label>Email</label>
                <input type="text" name='email' value={registerData.email} onChange={handleChange} />
                <label>Password</label>
                <input type="password" name='password' value={registerData.password} onChange={handleChange} />                                
                <button type="submit">Register</button>
            </form>
            
        </div>
    );
}

export default RegisterForm;