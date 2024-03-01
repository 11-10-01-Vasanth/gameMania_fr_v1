import React, { useState } from "react";

const LoginForm = () => {

    const [ loginData, setLoginData ] = useState({
        userName:'',
        password:''
        })

        const handleChange = (event) => {
            const { name, value } = event.target;
            setLoginData({ ...loginData, [name]: value })
            console.log(name, value);
        }  

        const handleLogin = (event) => {
            event.preventDefault();
            fetch(`http://localhost:2001/register/check?userName=${loginData.username}&password=${loginData.password}`)
            .then((response) => {
                if(!response.ok)
                {
                    throw new Error("Error Found");
                } 
                return response.json();
            }) 
            .then((data) => {
                if(data === !loginData.username && data === !loginData.password){
                    return alert("Login Failed");   
                } else{
                    setLoginData(data);
                    console.log(data);
                    return alert("Login Success");
                } 
            })
            .catch((error) => {
                console.error("Error", error);
            })
        }

    return(
        <div>
          <form onSubmit={handleLogin}>
                <label>Username</label>
                <input type="text" name='userName' value={loginData.userName} onChange={handleChange} />
                <label>Password</label>
                <input type="password" name='password' value={loginData.password} onChange={handleChange} />                
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginForm;