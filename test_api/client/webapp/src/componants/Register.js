import React from 'react'
import { Nevbar } from './nevbar'
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = props => {
    return (
        <div className="App conteiner">
            < Nevbar />   
            <h1>Register Page</h1>
            <form action="" method="post">
                <div className="form-group row">
                    <div className="mb3 mt-2">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" placeholder="Your Name" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col mx-auto mt-2">
                        <label htmlFor="">Username</label>
                        <input type="email" name="email" id="email" placeholder="Email" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col mx-auto mt-2">
                        <label htmlFor="">Password</label>
                        <input type="password" name="password" id="password" placeholder="Password" />
                    </div>
                </div>
                <button type="submit" className="mt-2">Adduser</button>
            </form>
        </div>
        
        
    )
}

export default Register;
