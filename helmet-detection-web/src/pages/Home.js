import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Tableshow from '../componants/Tableshow';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, MenuItem ,
    Paper, Grid, Select, Typography, CssBaseline, Card, CardHeader, CardContent } from '@mui/material';
import InputControls from '../componants/inputcontrols/InputControls'
import { Box } from '@mui/system';


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

const Home = props => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [monthData, setMonthData] = useState(new Date());
    const [yearData, setYearData] = useState(new Date());
    
    const [tebleData, setTebleData] = useState( {isReload: false, listData: ''});
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectInput, setSelectInput] = useState("Day");
    const [sumCount, setSumCount] = useState([]);
    const classes = useStyles();


    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios('http://localhost:3001/api/filter');
            const responseData = data.data
            const responseSum = data.sumcount[0]
            console.log(responseData.createdAt)
            setSumCount(responseSum);
            setTebleData({
                ...tebleData,
                listData: data
            });
            setIsLoaded(true);
            
        }
        fetchData();
        
    }, []);

    function getVideoFilter(){
        
        axios({
            method: 'get',
            url: 'http://localhost:3001/api/filter',
            params: {startDate, endDate, selectInput, yearData ,monthData}
          })
            .then(response => {
                const responseData = response.data
                const responseCount = response.data.sumcount[0]
                setTebleData({
                    ...tebleData,
                    listData: responseData,
                    isReload: false,
                })
                setSumCount(responseCount)
            })
            .catch(err => {
              console.error(err)
            })
    }
    
    if (isLoaded !== true){
       return <div>isLoaded..</div>
    }
    if (selectInput === 'Day'){
      return (
       <Container className={classes.root} maxWidth='xl'>
           <CssBaseline />
            <Grid container >
            <Grid container component={Paper}  square xs={12} className={classes.grid} >
            
                <Grid item xs={5} sm={5} md={2} margin={2}>
                    <Typography > Select your function: </Typography>
                </Grid>
                <Grid item xs={5} sm={3} md={2}>
                    <Select
                        id="customized-select"
                        placeholder='Select'
                        value={selectInput}
                        className={classes.mp}
                        variant='standard'
                        onChange={(e) => {setSelectInput(e.target.value)}} >
                        <MenuItem value="Day"> <em> Day </em> </MenuItem>
                        <MenuItem value="Week"> <em> Week </em> </MenuItem>
                        <MenuItem value="Month"> <em> Month </em></MenuItem>
                        <MenuItem value="Year"> <em> Year </em></MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={5} sm={5} md={2} marginTop={1}>
                    <Typography > Enter Date: </Typography>
                    <DatePicker
                        closeOnScroll={(e) => e.target === document}
                        name="startdate"
                        todayButton="ToDay" 
                        selected={startDate} 
                        onChange={(date) => setStartDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="time"
                        dateFormat ="yyyy-MM-dd HH:mm"
                        showMonthDropdown />
                </Grid>
                <Grid item xs={5} sm={5} md={2} marginTop={1}>
                    <Typography > Enter Date: </Typography>
                    <DatePicker
                            closeOnScroll={(e) => e.target === document}
                            name="enddate"
                            todayButton="ToDay" 
                            selected={endDate} 
                            onChange={(date) => setEndDate(date)}
                            showTimeSelect
                            includeDates={[startDate]}
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat ="yyyy-MM-dd HH:mm"
                            showMonthDropdown />  
                </Grid>
               
                <Grid item xs={2} sm={1} md={3} marginTop={2} align="right">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            getVideoFilter()
                        }}>ค้นหา</Button>
                </Grid>
            </Grid>
            
            <Grid container component={Paper} square xs={12}  md={12} align='center' padding={5}>
                <Grid item xs={3}  className={classes.griditem} >
                    <Typography component='div'> Wear a helmet </Typography>
                </Grid>
                <Grid item xs={3} className={classes.griditem} >
                    <Typography component='div'>{sumCount.helmet_count}</Typography>  
                </Grid>
                <Grid item xs={3}  className={classes.griditem}>
                    <Typography component='div'> Not wear a helmet</Typography>
                </Grid>
                <Grid item xs={3} className={classes.griditem}>
                    <Typography component='div'>{sumCount.not_helmet_count} </Typography>
                </Grid>
            </Grid>
            <Grid container component={Paper} square xs={12} align='right' padding={3}>
                < Tableshow listVideo={tebleData} setListVideo={setTebleData} />      
            </Grid>
        </Grid>
        </Container>
        )
    }

    if(selectInput === 'Week'){
        return (
            <Container className={classes.root}  maxWidth='xl'>
                <CssBaseline />
                <Grid container>
                    <InputControls.InputWeek 
                        selectInput={selectInput}
                        setSelectInput={setSelectInput}
                        sumCount={sumCount}
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        onClick={() => getVideoFilter()}
                        />
                <Grid container component={Paper} square xs={12} align='center' padding={3}>
                    < Tableshow listVideo={tebleData} setListVideo={setTebleData} /> 
                </Grid>
                </Grid>
            </Container>
            
        )
       
    }
    if (selectInput === 'Month'){
        return (
            <Container className={classes.root}  maxWidth='xl'>
                <CssBaseline />
                <Grid container>
                    <InputControls.InputMonth 
                        selectInput={selectInput}
                        setSelectInput={setSelectInput}
                        sumCount={sumCount}
                        monthData={monthData}
                        setMonthData={setMonthData}
                        onClick={() => getVideoFilter()}
                        />
                <Grid container component={Paper} square xs={12} align='center' padding={3}>
                    < Tableshow listVideo={tebleData} setListVideo={setTebleData} /> 
                </Grid>
                </Grid>
            </Container>
        )
      }
      if (selectInput === 'Year'){

        return (
            <Container className={classes.root}  maxWidth='xl'>
                <CssBaseline />
                <Grid container>
                    <InputControls.InputYear 
                        selectInput={selectInput}
                        setSelectInput={setSelectInput}
                        sumCount={sumCount}
                        yearData={yearData}
                        setYearData={setYearData}
                        onClick={() => getVideoFilter()}
                        />
                <Grid container component={Paper} square xs={12} align='center' padding={3}>
                    < Tableshow listVideo={tebleData} setListVideo={setTebleData} /> 
                </Grid>
                </Grid>
            </Container>
        )
      }
    return (
        <Container className={classes.root}  maxWidth='xl'>
            <CssBaseline />
            <Grid container>
                <Grid container component={Paper} square xs={12} className={classes.grid} >
                    <Grid item xs={1} margin={2}>
                        <Typography > Select your function: </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Select
                            id="customized-select"
                            placeholder='Select'
                            value={selectInput}
                            className={classes.mp}
                            variant='standard'
                            onChange={(e) => {setSelectInput(e.target.value)}}>
                            <MenuItem value="Day"> <em> Day </em> </MenuItem>
                            <MenuItem value="Week"> <em> Week </em> </MenuItem>
                            <MenuItem value="Month"> <em> Month </em> </MenuItem>
                            <MenuItem value="Year"> <em> Year </em> </MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={3} marginTop={1}>
                        
                        <Typography > Start Date: </Typography>
                        <DatePicker
                            closeOnScroll={(e) => e.target === document}
                            name="startdate"
                            todayButton="ToDay" 
                            placeholderText="Select Start Date"
                            showTimeSelect
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            selected={startDate}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(date) => setStartDate(date)}
                            timeInputLabel="Time:"
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat ="yyyy-MM-dd HH:mm"/>
                    </Grid>
                    <Grid item xs={4} marginTop={1}>
                        
                        <Typography > End Date: </Typography>
                        <DatePicker
                            closeOnScroll={(e) => e.target === document}
                            name="enddate"
                            todayButton="ToDay" 
                            placeholderText="Select End Date"
                            showTimeSelect
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            selected={endDate}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            onChange={(date) => setEndDate(date)}
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="yyyy-MM-dd HH:mm"/>
                    </Grid>
                    <Grid item xs={1} marginTop={2} align='right'>
                        <Button 
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={() => {getVideoFilter()}}>
                            ค้นหา
                        </Button>
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
                    < Tableshow listVideo={tebleData} setListVideo={setTebleData} /> 
                </Grid>
            </Grid>
        </Container>
        
    )
}


export default Home