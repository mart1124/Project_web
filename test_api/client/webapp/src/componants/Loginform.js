import React from 'react';
import { Nevbar } from './nevbar';
import { useEffect, useState } from 'react';

const Loginform = props => {

    return (
        <div className="App conteiner">
            < Nevbar />
            <div className="card">
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