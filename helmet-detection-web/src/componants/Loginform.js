import React from 'react';
import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios'
import { Button, Container, CssBaseline, TextField,
    Paper, Grid, Link, Typography} from '@material-ui/core';
// import Alert from '@material-ui/lab/Alert';
import { makeStyles, createTheme  } from '@material-ui/core/styles';

// axios.defaults.withCredentials = true;

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
    const [loginstatus, setLoginstatus] = useState(false);
    const classes = useStyles();
    const history = useHistory();
    function userLogin(){
        axios
            .post("http://localhost:3001/api/login", { email: email, password: password }, { validateStatus: function (status) {
                return status < 500; // Reject only if the status code is greater than or equal to 500
              } })
            .then(response => {
                console.log(response.data.token)
                if (response.status == 200 && response.data.auth == true){
                    setLoginstatus(true)
                    // let path = `/`; 
                    // history.push(path); 
                    console.log(response)
                    axios('http://localhost:3001/home', { 
                        // withCredentials: true ,
                        headers: {
                            Authorization: response.data.token
                        }
                    }).then((res) => {
                        let path = `/`; 
                        history.push(path); 
                       console.log(res) 
                    })
                  }
                
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
                    {/* <Alert severity="error">This is an error alert — check it out!</Alert> */}
                </Paper>
            </div>
        </Container>
    
    )
}

export default Loginform;