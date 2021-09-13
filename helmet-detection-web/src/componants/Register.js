import React, { useEffect, useState } from 'react'
import { Nevbar } from './nevbar'
import axios from 'axios'
import { Button, Container, CssBaseline, TextField,
    Paper, Grid, Link, Typography} from '@material-ui/core';
import { makeStyles, createTheme  } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
        marginTop: theme.spacing(12),
        width: theme.spacing(50),
        height: theme.spacing(50),
        },
      },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(350 + theme.spacing(2) * 2)]: {
            width: 350,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        textAlign: "center",
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(350 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: 'auto', 
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(2, 0, 2),  
    },
  }));


const Register = () => {
    const [inputname, setInputname] = useState("");
    const [inputemail, setInputemail] = useState("");
    const [inputpassword, setinputPassword] = useState("");
    const classes = useStyles();

    function userRegister(){
        axios
            .post("http://localhost:3001/api/register", { name: inputname,  email: inputemail, password: inputpassword })
            .then(response => {
                // เปิดหน้า Login
                
            })
            .catch(err => {
               return Promise.reject(err);
            })
    }
    return (
        <Container component="main" maxWidth="md" >
            <CssBaseline />
            <div className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        User Register
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="name"
                        label="Name"
                        type="text"
                        onChange={(e) => {setInputname(e.target.value)}}

                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        name="email"
                        autoFocus
                        onChange={(e) => {setInputemail(e.target.value)}}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        onChange={(e) => {setinputPassword(e.target.value)}}

                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => {
                            userRegister()
                        }}
                    >
                        Sign Up
                    </Button>
                </Paper>
            </div>
        </Container>
        // <Container fixed>
        //     {/* < Nevbar />    */}
        //     <h1>Register Page</h1>
        //     <form>
        //         <div className="form-group row">
        //             <div className="mb3 mt-2">
        //                 <label>Name</label>
        //                 <br />
        //                 <input 
        //                     type="text" 
        //                     name="name" 
        //                     placeholder="name" 
        //                     value={inputname} 
        //                     onChange={(e) => {setInputname(e.target.value)}} 
        //                     />
        //             </div>
        //         </div>
        //         <div className="form-group">
        //             <div className="col mx-auto mt-2">
        //                 <label>Username</label>
        //                 <br />
        //                 <input 
        //                     type="email" 
        //                     placeholder="Email" 
        //                     value={inputemail} 
        //                     onChange={(e) => {setInputemail(e.target.value)}} /> 
        //             </div>
        //         </div>
        //         <div className="form-group">
        //             <div className="col mx-auto mt-2">
        //                 <label>Password</label>
        //                 <br />
        //                 <input 
        //                     type="password" 
        //                     name="password" 
        //                     placeholder="password" 
        //                     value={inputpassword} 
        //                     onChange={(e) => {setinputPassword(e.target.value)}} 
        //                     />
        //             </div>
        //         </div>
        //         <Button variant="contained" color="primary" onClick={() => {
        //            userRegister()
        //         }}>AddUser</Button>
        //     </form>
        // </Container>
        
        
    )
}

export default Register;
