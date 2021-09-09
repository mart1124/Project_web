import React from 'react';
import { Nevbar } from './nevbar';
import { useEffect, useState } from 'react';

const Loginform = props => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="App conteiner">
            < Nevbar />
            <div className="card">
                <h1>Login</h1>
                <div className="card-body"> 
                <label htmlFor="">Username</label>
                <br />
                <input type="email" name="email" placeholder="Email" /> 
                <br />
            
                <label htmlFor="">Password</label>
                <br />
                <input type="password" name="password" placeholder="password" />
                    
                <br />   
                <button onClick={() => {
                   
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