import React, { useState, Fragment} from 'react'
import axios from 'axios'
import { Button,CssBaseline, TextField, Alert} from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { userSchema } from '../componants/validations/UserValidate.js'
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
        textAlign: "center",
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


const Register = (props) => {
    const classes = useStyles();
    const { setOpenPopup, setOnAddUser } = props
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
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
            .post("http://localhost:3001/api/register", { data },{ validateStatus: function (status) {
                return status < 500; // Reject only if the status code is greater than or equal to 500
              } })
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    setOpenPopup(false)
                    setOnAddUser(true)
                    
                }
                
                if (response.status === 409){
                    setAlertContent(response.data.message);
                    setAlert(true);
                }
            })
            .catch(err => {
            //    return Promise.reject(err);
                console.error(err)
            })
    }

    return (

        <Fragment>
        {/* <Container component="main" maxWidth="md" > */}
            <CssBaseline />
            <div className={classes.layout}>
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
                    {alert ? <Alert severity='error' onClose={() => setAlert(null)} >
                        {alertContent}  </Alert> : <></> }
                        <br />
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
                    {/* <Typography >
                        Have an Account ? &nbsp;
                        <Link href="/admin/login">
                            Sing In 
                        </Link>
                    </Typography> */}
                {/* </Paper> */}
            </div>
        {/* </Container> */}
        </Fragment>      
    )
}

export default Register;
