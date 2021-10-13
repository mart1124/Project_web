import React from 'react'
import {Snackbar, Alert} from '@mui/material';
import { makeStyles } from '@material-ui/core';



const useStyles = makeStyles( theme => ({
    root: {
        top: theme.spacing(9)
    }
}))

function Notification(props) {

    const { notify, setNotify } = props;
    const classes = useStyles();

    const handleClose = (event, reason) => {

        setNotify({
            ...notify,
            isOpen:false
        })
    }

    return (
        <Snackbar
            className={classes.root}
            open={notify.isOpen}
            autoHideDuration={3000}
            anchorOrigin={{vertical:'top', horizontal:'right'}}
            onClose={handleClose} >
            <Alert 
                severity={notify.type} 
                onClose={handleClose} >
                {notify.massage}
            </Alert>
        </Snackbar>
    )
}

export default Notification
