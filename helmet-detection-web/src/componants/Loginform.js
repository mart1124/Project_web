import React from 'react';
import { Nevbar } from './nevbar';
import { useEffect, useState } from 'react';
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
            padding: theme.spacing(2),
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
      padding: theme.spacing(1, 4),
    },
  }));

const Loginform = props => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const classes = useStyles();
    function userLogin(){
        axios
            .post("http://localhost:3001/api/login", { email: email, password: password }, { validateStatus: function (status) {
                return status < 500; // Reject only if the status code is greater than or equal to 500
              } })
            .then(response => {
                if (response.status == 400){
                  console.log("response: ", response.data)  
                }
                
            })
            .catch(err => {
                console.error(err)
            })
    }

   

    console.log("login:", email, password)
    return (
        <Container component="main" maxWidth="md" >
            <CssBaseline />
            <div className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        User Login
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        name="email"
                        autoFocus
                        onChange={(e) => {setEmail(e.target.value)}}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        onChange={(e) => {setPassword(e.target.value)}}

                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => {
                            userLogin()
                        }}
                    >
                        Sign In
                    </Button>
                    <hr />
                    <Typography >
                        <Link href="/admin/register">
                            Create a new Account ? 
                        </Link>
                    </Typography>
                </Paper>
            </div>
        </Container>
        
        // <div className="App conteiner">
        //     < Nevbar />
        //     <div className="card">
        //         <h1>Login</h1>
        //         <div className="card-body"> 
        //         <label> Username </label>
        //         <br />
        //         <input 
        //             type="email" 
        //             placeholder="Email" 
        //             value={email} 
        //             onChange={(e) => {setEmail(e.target.value)}} /> 
        //         <br />
        //         <label> Password </label>
        //         <br />
        //         <input 
        //             type="password" 
        //             name="password" 
        //             placeholder="password" 
        //             value={password} 
        //             onChange={(e) => {setPassword(e.target.value)}} 
        //             />
                    
        //         <br />   
        //         <button onClick={() => {
        //            userLogin()
        //         }}>Login</button>
        //     </div>
        
        //     </div>
        // </div>
    )
}

export default Loginform;


{/* <Container component="main" maxWidth="xs">
<div className={classes.root}>
<CssBaseline />
<div className={classes.paper}>
    <Typography component="h1" variant="h5">
        Sign in
    </Typography>
    <form className={classes.form} noValidate>
    <TextField
        variant="outlined"
        margin="normal"
        required
        // fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
    />
    <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
    />
    <Box textAlign='center'>
        <Button
            type="submit"
            maxWidth="md"
            variant="contained"
            color="primary"
            className={classes.submit}
        >
            Sign In
        </Button>
        <hr />
        <Button
            href = "/admin/register"
            fullWidth
            variant="contained"
            color="primary"
        >
            Register
        </Button>
        <hr />
    </Box>
    </form>
</div>
</div>
</Container> */}