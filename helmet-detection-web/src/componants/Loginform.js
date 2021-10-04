import React from 'react';
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios'
import { Button, Container, CssBaseline, TextField,
    Paper, Alert , Link, Typography} from '@mui/material';
import { makeStyles} from '@material-ui/core/styles';

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
    const [password, setPassword] = useState("");;
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const classes = useStyles();
    const history = useHistory();
    

    function userLogin(){
        axios
            .post("http://localhost:3001/api/login", { email: email, password: password }, { validateStatus: function (status) {
                return status < 500; // Reject only if the status code is greater than or equal to 500
              } })
            .then(response => {
    
                if (response.status === 200 && response.data.auth === true){
                    let authstatus = response.data.auth
                    axios('http://localhost:3001/auth', { 
                        params: {authstatus},
                        headers: {
                            Authorization: response.data.token
                        }
                    }).then((res) => {
                        if(res.status === 200){ 
                            let path = `/`; 
                            history.push(path); 
                            console.log(res) 
                        } else {
                            console.log(res)
                        }
                        
                    })
                  }
                
                if (response.status === 400){
                    setAlertContent(response.data.message);
                    setAlert(true);
                }
                
            })
            .catch(err => {
                alert(err)
                console.error(err)
            })
    }

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
                    {alert ? <Alert severity='error' onClose={() => setAlert(null)} >
                        {alertContent}  </Alert> : <></> }
                    <br />
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
                        Create a new Account ? &nbsp;
                        <Link href="/admin/register">
                            Sign Up
                        </Link>
                    </Typography>
                </Paper>
            </div>
        </Container>
    
    )
}

export default Loginform;