import { Typography } from '@material-ui/core'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Controls from './Controls'

const useStyles = makeStyles((theme) => ({
    dialogWrapper : {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(1)
    }
    
}));


export default function Popup(props) {

    const { title, children, openPopup, setOpenPopup } = props
    const classes = useStyles();

    return (
        <Dialog open={openPopup} maxWidth='md' classes={{ paper : classes.dialogWrapper}}>
            <DialogTitle>
                <div style={{ display : 'flex' }}>
                    <Typography variant='h6' component='div' style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <Controls.ActionButton
                        variant='text'
                        color="secondary"
                        onClick={() => setOpenPopup(false)}
                    >
                        <CloseOutlinedIcon color='error' />
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
}
