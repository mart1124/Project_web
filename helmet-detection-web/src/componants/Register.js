import React, {Fragment} from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import { Button, Container, CssBaseline, TextField,
    Paper, Link, Typography} from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { userSchema } from './validations/UserValidate.js'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';


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
    const classes = useStyles();
    const history = useHistory();
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm({
        resolver: yupResolver(userSchema)
      });
      const userRegister = data =>  {
        /* 
            ======== ส่ง data ไป Register ======== 
        */
        axios
            .post("http://localhost:3001/api/register", { data })
            .then(response => {
                // เปิดหน้า Login
                if(response.status === 200){   
                    let path = `/admin/login`; 
                    history.push(path); 
                    console.log(response) 
                } else {
                    console.log(response)
                }
                console.log(response)
            })
            .catch(err => {
               return Promise.reject(err);
            })
    }

    return (

        <Fragment>
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
                        {...register('name')}
                        error={errors.name ? true : false}
                        helperText={errors.name?.message}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        name="email"
                        autoFocus
                        {...register('email')}
                        error={errors.email ? true : false}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        {...register('password')}
                        error={errors.password ? true : false}
                        helperText={errors.password?.message}
                    />
                     <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        fullWidth
                        {...register('confirmPassword')}
                        error={errors.confirmPassword ? true : false}
                        helperText={errors.confirmPassword?.message}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={
                            handleSubmit(userRegister)      
                        }
                    >
                        Sign Up
                    </Button>
                    <hr />
                    <Typography >
                        Have an Account ? &nbsp;
                        <Link href="/admin/login">
                            Sing In 
                        </Link>
                    </Typography>
                </Paper>
            </div>
        </Container>
        </Fragment>      
    )
}

export default Register;
