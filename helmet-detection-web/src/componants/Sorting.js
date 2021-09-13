import React, { useState, useEffect } from 'react';
import { Nevbar } from './nevbar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Tableshow from './Tableshow';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, CssBaseline, MenuItem ,
    Paper, Grid, Select, Typography, Box} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2, 1, 3, 2),
    },
    grid: {
        marginTop: theme.spacing(1),
    },
    mp: {
        margin: theme.spacing(2, 1, 3, 2),
        minWidth: 120,
    },
    Paper: {
        padding: theme.spacing(1,1),
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
        margin: theme.spacing(2, 1, 3, 2)
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
    const [period, setPeriod] = useState("");

    const classes = useStyles();
    

    const fetchData = async () => {
            const { data} = await axios('http://localhost:3001/api/filter');
            setTebleData(data)
            setIsLoaded(true)
            setError(error);
        }
    useEffect(() => {
        
        fetchData();
        
    }, []);

    function getVideoFilter(){
        axios({
            method: 'get',
            url: 'http://localhost:3001/api/filter',
            params: {startDate, endDate}
          })
            .then(response => {
                setTebleData(response.data)
            })
            .catch(err => {
              console.error(err)
            })
    }

    if (isLoaded != true){
       return <div>isLoaded..</div>
    }
    return (
        <Container>
        <div className={classes.layout}>
            
                <Box component={Paper} display="flex" flexDirection="row" square = "true" alignItems="center">
                    <Typography className={classes.Box}> Select your function: </Typography>
                    <Select
                        id="demo-customized-select"
                        value={period}
                        className={classes.mp}
                        onChange={(e) => {setPeriod(e.target.value)}}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="Day">Day</MenuItem>
                        <MenuItem value="Week">Week</MenuItem>
                        <MenuItem value="Month">Month</MenuItem>
                    </Select>
                    <Box className={classes.Box}>
                        <DatePicker
                            name="startdate"
                            todayButton="ToDay" 
                            selected={startDate} 
                            onChange={(date) => setStartDate(date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="yyyy-MM-dd HH:mm"
                            showMonthDropdown />
                    </Box>
                    <Box className={classes.Box}>
                        <Typography> To </Typography>
                    </Box>
                    <Box className={classes.Box}>
                        <DatePicker
                            name="startdate"
                            todayButton="ToDay" 
                            selected={startDate} 
                            onChange={(date) => setStartDate(date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="yyyy-MM-dd HH:mm"
                            showMonthDropdown />
                    </Box>
                    <Box className={classes.Box}>
                        <Button 
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                getVideoFilter()
                            }}>ค้นหา</Button>
                        </Box>
                </Box>
                {/* <Grid className={classes.Paper} container item xs={12} component = {Paper} square = "true" >
                    <Grid container item xs={3}>
                        <DatePicker
                            name="startdate"
                            todayButton="ToDay" 
                            selected={startDate} 
                            onChange={(date) => setStartDate(date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="yyyy-MM-dd HH:mm"
                            showMonthDropdown />
                        <h4>TO</h4>
                    </Grid>
                    
                    <Grid container item xs={3}>
                    <DatePicker 
                        name="enddate"
                        todayButton="ToDay"
                        selected={endDate} 
                        onChange={(date) => setEndDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="time"
                        dateFormat="yyyy-MM-dd HH:mm"
                        showMonthDropdown /> 
                    </Grid>
                    <Grid container item xs={3}>
                        <button onClick={() => {
                            getVideoFilter()
                        }}>ค้นหา</button>
                    </Grid>
                    
                </Grid> */}
                <Grid className={classes.grid} container item xs={12} >
                    < Tableshow listVideo={tebleData}/>
                </Grid>
              
        </div>
        </Container>
        // <div className="App">
        //     <div>Test Data</div>
        //     <div>
        //     <DatePicker
        //         name="startdate"
        //         todayButton="ToDay" 
        //         selected={startDate} 
        //         onChange={(date) => setStartDate(date)}
        //         showTimeSelect
        //         timeFormat="HH:mm"
        //         timeIntervals={15}
        //         timeCaption="time"
        //         dateFormat="yyyy-MM-dd HH:mm"
        //         showMonthDropdown />
        //     <h4>TO</h4>
        //     <DatePicker 
        //         name="enddate"
        //         todayButton="ToDay"
        //         selected={endDate} 
        //         onChange={(date) => setEndDate(date)}
        //         showTimeSelect
        //         timeFormat="HH:mm"
        //         timeIntervals={15}
        //         timeCaption="time"
        //         dateFormat="yyyy-MM-dd HH:mm"
        //         showMonthDropdown /> 
        //     <button onClick={() => {
        //         getVideoFilter()
        //     }}>ค้นหา</button>
            // </div>
            // <div>
            //     < Tableshow listVideo={tebleData}/>
            // </div>
        // </div>
    )
}


export default Sorting
