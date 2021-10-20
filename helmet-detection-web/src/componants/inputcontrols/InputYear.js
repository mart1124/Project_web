import React from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { makeStyles } from '@material-ui/core/styles';
import { Button, MenuItem ,
    Paper, Grid, Select, Typography } from '@mui/material';


const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2, 1, 3, 2),
    },
    griditem: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    grid: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(2),
    },
    mp: {
        margin: theme.spacing(2),
        minWidth: 100,
    },
    paper: {
        padding: theme.spacing(1,1),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        },
    layout: {
        width: 'auto',
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(350 + theme.spacing(2) * 2)]: {
            width: "auto",
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    Box: {
        margin: theme.spacing(2, 1, 3, 2),
        // display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
}));

const InputYear = (props) => {

    const {
        selectInput, setSelectInput, 
        sumCount,
        yearData, setYearData,
        onClick
    } = props

    const classes = useStyles();

   
    return (
        <>
            <Grid container component={Paper}  square xs={12} className={classes.grid} >
                <Grid item xs={5} sm={5} md={2} margin={2}>
                    <Typography > Select your function: </Typography>
                </Grid>
                <Grid item xs={5} sm={5} md={2}>
                <Select
                    id="customized-select"
                    placeholder='Select'
                    value={selectInput}
                    className={classes.mp}
                    variant='standard'
                    onChange={(e) => {setSelectInput(e.target.value)}} >
                    <MenuItem value="Day"> <em> Day </em> </MenuItem>
                    <MenuItem value="Week"> <em> Week </em> </MenuItem>
                    <MenuItem value="Month"> <em> Month </em> </MenuItem>
                    <MenuItem value="Year"> <em> Year </em> </MenuItem>
                </Select>
                </Grid>
                <Grid item xs={6} sm={5} md={6} marginTop={1}>
                    <Typography > Enter Year: </Typography>
                    <DatePicker
                        closeOnScroll={(e) => e.target === document}
                        name="year"
                        todayButton="ToDay" 
                        selected={yearData} 
                        onChange={(date) => setYearData(date)}
                        showYearPicker
                        dateFormat ="yyyy"/>
                </Grid>
            <Grid item xs={6} sm={6} md={1} marginTop={2} align='right'>
                    <Button 
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={onClick}>
                        ค้นหา
                    </Button>
            </Grid>
            </Grid>
            <Grid container component={Paper} square xs={12} align='center' padding={5}>
                <Grid item xs={3} className={classes.griditem} >
                    <Typography> Wear a helmet </Typography>
                </Grid>
                <Grid item xs={3} className={classes.griditem} >
                    <Typography fontWeight={600}>{sumCount.helmet_count}</Typography>  
                </Grid>
                <Grid item xs={3} className={classes.griditem}>
                    <Typography > Not wear a helmet</Typography>
                </Grid>
                <Grid item xs={3} className={classes.griditem}>
                    <Typography fontWeight={600}>{sumCount.not_helmet_count} </Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default InputYear
