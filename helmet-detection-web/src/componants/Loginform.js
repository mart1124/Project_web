import React from 'react';
import { Nevbar } from './nevbar';
import { useEffect, useState } from 'react';
import axios from 'axios'

const Loginform = props => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function userLogin(){
        axios
            .post("http://localhost:3001/api/login", { email: "test001@gmail.com", password: "1234567" })
            .then(response => {
                console.log("response: ", response)
            })
            .catch(err => {
                console.error(err)
            })
    }

    console.log("login:", email, password)
    return (
        <div className="App conteiner">
            < Nevbar />
            <div className="card">
                <h1>Login</h1>
                <div className="card-body"> 
                <label> Username </label>
                <br />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => {setEmail(e.target.value)}} /> 
                <br />
                <label> Password </label>
                <br />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="password" 
                    value={password} 
                    onChange={(e) => {setPassword(e.target.value)}} 
                    />
                    
                <br />   
                <button onClick={() => {
                   userLogin()
                }}>Login</button>
            </div>
        
            </div>
        </div>
    )
}

export default Loginform;


{/* <div className="card">
            <h1>Login</h1>
            <div className="card-body"> 
            <form action="/admin/login" method="post">
                <div className="form-group row">
                <div className="col-7 mx-auto">
                    <label htmlFor="">Username</label>
                    <input type="email" name="email" placeholder="Email" /> 
                </div>
                </div>
                <div className="form-group mt-2">
                <div className="col-7 mx-auto">
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" placeholder="password" />
                </div>
                </div>
                
                <button type="submit" className="btn-primary mt-2">sign in</button>
            </form>
            </div>
            </div> */}