import React from 'react'
import { Button } from '@mui/material';
import { makeStyles } from '@material-ui/core';


const useStytes = makeStyles((theme) => ({
    root: {
        minWidth: 0,
        margin: theme.spacing(0.5)
    },
    secondary: {
        backgroundColor: theme.palette.secondary.light,
        '& .MuiButton-label': {
            color: theme.palette.secondary.main
        }
    },
    primary: {
        backgroundColor: theme.palette.primary.light,
        '& .MuiButton-label': {
            color: theme.palette.primary.main
        }
    }
}))

function ActionButton(props) {

    const { color, children, variant, onClick} = props;
    const classes = useStytes();

    return (
        
        <Button
            variant={ variant || "contained"}
            className={`${classes.root} ${classes[color]}`}
            color={color}
            onClick={onClick}
        >
            {children}
        </Button>

    )
}

export default ActionButton
