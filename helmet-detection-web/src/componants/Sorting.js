import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Tableshow from './Tableshow';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, MenuItem ,
    Paper, Grid, Select, Typography, Box} from '@mui/material';
    

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

const Sorting = props => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [tebleData, setTebleData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectInput, setSelectInput] = useState("");
    const [sumCount, setSumCount] = useState([]);

    const classes = useStyles();
    

    const fetchData = async () => {
            const { data} = await axios('http://localhost:3001/api/filter');
            console.log(data.sumcount[0]);
            setSumCount(data.sumcount[0]);
            setTebleData(data);
            setIsLoaded(true);
            setError(error);
        }
    useEffect(() => {
        
        fetchData();
        
    }, []);

    function getVideoFilter(){
        axios({
            method: 'get',
            url: 'http://localhost:3001/api/filter',
            params: {startDate, endDate, selectInput}
          })
            .then(response => {
                console.log(response.data.sumcount[0])
                setTebleData(response.data)
                setSumCount(response.data.sumcount[0])
            })
            .catch(err => {
              console.error(err)
            })
    }

    if (isLoaded != true){
       return <div>isLoaded..</div>
    }
    if (selectInput === 'Day'){
      return (
       <Container className={classes.root}>
            <Grid container component={Paper}>
            <Grid container square xs={12} className={classes.grid} >
                <Grid item xs={1} margin={2}>
                    <Typography > Select your function: </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Select
                        id="demo-customized-select"
                        placeholder='Select'
                        value={selectInput}
                        className={classes.mp}
                        variant='standard'
                        onChange={(e) => {setSelectInput(e.target.value)}}
                        
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="Day">Day</MenuItem>
                        <MenuItem value="Week">Week</MenuItem>
                        <MenuItem value="Month">Month</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={3} marginTop={1}>
                    <Typography > Enter Date: </Typography>
                    <DatePicker
                        name="startdate"
                        todayButton="ToDay" 
                        selected={startDate} 
                        onChange={(date) => setStartDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="time"
                        dateFormat ="yyyy-MM-dd HH:mm"
                        showMonthDropdown
                        />
                </Grid>
                <Grid item xs={2} marginTop={1}>
                <Typography > Enter Date: </Typography>
                    <DatePicker
                        name="enddate"
                        todayButton="ToDay" 
                        selected={endDate} 
                        onChange={(date) => setEndDate(date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeFormat="HH:mm"
                        timeIntervals={10}
                        timeCaption="time"
                        dateFormat="HH:mm"
                        />
                </Grid>
                <Grid item xs={2} marginTop={1}>
                <Typography > Enter Date: </Typography>
                    <DatePicker
                        name="enddate"
                        todayButton="ToDay" 
                        selected={endDate} 
                        onChange={(date) => setEndDate(date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeFormat="HH:mm"
                        timeIntervals={10}
                        timeCaption="time"
                        dateFormat="HH:mm"
                        />
                </Grid>
                <Grid item xs={1} marginTop={2}>
                    <Button 
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            getVideoFilter()
                        }}>ค้นหา</Button>
                </Grid>
            </Grid>
            <Grid container component={Paper} square xs={12} align='center' padding={5}>
                <Grid item sm={3} className={classes.griditem} >
                    <Typography> Wear a helmet </Typography>
                </Grid>
                <Grid item sm={3} className={classes.griditem} >
                    <Typography>{sumCount.helmet_count}</Typography>  
                </Grid>
                <Grid item xs={3} className={classes.griditem}>
                    <Typography > Not wear a helmet</Typography>
                </Grid>
                <Grid item xs={3} className={classes.griditem}>
                    <Typography >{sumCount.not_helmet_count} </Typography>
                </Grid>
            </Grid>
            <Grid container component={Paper} square xs={12} align='center'>
                < Tableshow listVideo={tebleData}/>
            </Grid>
        </Grid>
        </Container>
        )
    }
    return (
        <Container className={classes.root}>
            <Grid container>
                <Grid container  square xs={10} className={classes.grid} >
                    <Grid item xs={1} margin={2}>
                        <Typography > Select your function: </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Select
                            id="demo-customized-select"
                            placeholder='Select'
                            value={selectInput}
                            className={classes.mp}
                            variant='standard'
                            onChange={(e) => {setSelectInput(e.target.value)}}
                            
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="Day">Day</MenuItem>
                            <MenuItem value="Week">Week</MenuItem>
                            <MenuItem value="Month">Month</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={3} marginTop={1}>
                        <Typography > Enter Date: </Typography>
                        <DatePicker
                            name="startdate"
                            todayButton="ToDay" 
                            selected={startDate} 
                            onChange={(date) => setStartDate(date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat ="yyyy-MM-dd HH:mm"
                            showMonthDropdown
                            
                            />
                    </Grid>
                    <Grid item xs={3} marginTop={1}>
                    <Typography > Enter Date: </Typography>
                        <DatePicker
                            name="enddate"
                            todayButton="ToDay" 
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="yyyy-MM-dd HH:mm"
                            showMonthDropdown />
                    </Grid>
                    <Grid item xs={2} marginTop={2} align='left'>
                        <Button 
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                getVideoFilter()
                            }}>ค้นหา</Button>
                    </Grid>
                </Grid>
                <Grid container component={Paper} square xs={2} className={classes.grid} > 
                
                </Grid>    
                <Grid container component={Paper} square xs={12} align='center' padding={5}>
                    <Grid item sm={3} className={classes.griditem} >
                        <Typography> Wear a helmet </Typography>
                    </Grid>
                    <Grid item sm={3} className={classes.griditem} >
                        <Typography>{sumCount.helmet_count}</Typography>  
                    </Grid>
                    <Grid item xs={3} className={classes.griditem}>
                        <Typography > Not wear a helmet</Typography>
                    </Grid>
                    <Grid item xs={3} className={classes.griditem}>
                        <Typography >{sumCount.not_helmet_count} </Typography>
                    </Grid>
                </Grid>
                <Grid container component={Paper} square xs={12} align='center'>
                    < Tableshow listVideo={tebleData}/>
                </Grid>
            </Grid>
        </Container>
        
    )
}


export default Sorting