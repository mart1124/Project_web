import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles( theme => ({
    Dialog: {
        padding: theme.spacing(2),
        position: 'absolute',
    },
    DialogContent: {
        textAlign: 'left'
    },
    DialogActions:{
        justifyContent: 'center'
    }
}))

function ConfirmDialog(props) {

    const  {confirmDialog, setConfirmDialog } = props;
    const classes = useStyles();

    return (
        <Dialog open={confirmDialog.isOpen} classes={{paper:classes.Dialog}}>
            <DialogTitle>

            </DialogTitle>
            <DialogContent className={classes.DialogContent}>
                <Typography variant="h5">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.DialogActions}>
                <Button 
                    variant="contained" 
                    color="secondary"
                    onClick={confirmDialog.onConfirm}>
                    Yes
                </Button>
                <Button 
                    variant="contained" 
                    color="default"
                    onClick={() => setConfirmDialog({...confirmDialog ,isOpen: false})}>
                    No
                </Button>
                
            </DialogActions>
        </Dialog>
        
    )
}

export default ConfirmDialog
