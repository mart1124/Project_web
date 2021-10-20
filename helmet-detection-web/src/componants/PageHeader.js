import { Card, Container, Paper, Typography } from '@mui/material'
import React from 'react'
import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {   
        backgroundColor: '#fdfdff'
    },
    pageHeader: {
        padding: theme.spacing(1),
        display:'flex',
        marginBottom: theme.spacing(2)
    },
    pageIcon: {
        display: 'inline-block',
        padding: theme.spacing(2),
        color: '#3c44b1',
    },
    pageTitle: {
        paddingLeft: theme.spacing(4),
        paddingTop: theme.spacing(2),
    }
  }));

export default function PageHeader(props) {

    const { title, icon } = props;
    const classes = useStyles()

    return (
        
        <Paper elevation={0} square className={classes.root}>
            <div className={classes.pageHeader}>
                <Card className={classes.pageIcon}>
                    {icon}
                </Card>
                <div className={classes.pageTitle}>
                    <Typography 
                        variant='h6'
                        component='div' >
                        {title}
                    </Typography>
                </div>
            </div>
        </Paper>

    )
}
