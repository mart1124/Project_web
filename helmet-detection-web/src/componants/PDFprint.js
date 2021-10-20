import React, { useState, useEffect }  from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import {Typography, Paper, Container, CssBaseline, Grid} from '@mui/material';
import { makeStyles } from '@material-ui/core';



const useStyles = makeStyles(theme => ({
    Paper:{
        padding: theme.spacing(1),
        height: 920,
        // width: 595,
    },
    logo: {
        width: 85,
        height: 135
    },
    image:{
        width: 650,
        height: 200
    },
    imageshow:{
        width: 560,
        height: 320,
        [theme.breakpoints.down(480)]: {
            width: 300,
            height: 180,
        },
    },
    

}))

function PDFprint() {
    const { id, namepic } = useParams();
    console.log(id,namepic)
    const [printData, setPrintData] = useState([]);
    const [printCount, setPrintCount] = useState([]);
    const [preview, setPreview] = useState(true)
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const classes = useStyles()

    useEffect(() => {
        const fetchData = async () => {
          await axios({
                method: 'get',
                url: 'http://localhost:3001/api/getprintdata',
                params: {id: id}
              })
                .then(response => {
                    let responseData = response.data
                    let responseArrayData = responseData.data[0]
                    console.log(responseArrayData.name)
                    if( responseArrayData.createdAt.trim()){
                       const datearray = responseArrayData.createdAt.split(' ')
                        setDate(datearray[0])
                        setTime(datearray[1])
                    }
                    setPrintData(responseArrayData)
                    setPrintCount(responseData.sumcount[0])
                    setPreview(true)
                    window.print()
                })
                .catch(err => {
                  console.error(err)
                })
                
                
        }
        fetchData();
        
    }, []);


    return (
        <React.Fragment>
            <Container component='main' maxWidth='md' >
                <CssBaseline />
                <Grid component={Paper} elevation={0} className={classes.Paper} square align='center'>
                    <center><img src="/Rmutt-logo.png" alt="rmuttlogo" className={classes.logo} /></center>
                    <center><img src="/MODEL.png" alt="helmetlogo"  className={classes.image} /></center>
                    <Grid container>
                        <Grid container xs={12} margin={2} >
                            <Grid item xs={12} marginBottom={2} >
                                <Typography style={{ fontWeight: 700 , fontSize: 18}}>
                                    ใบรายงานผล
                                </Typography>
                                <Typography>
                                    ระบบตรวจจับผู้ไม่สวมใส่หมวกกันน็อกในระหว่างขับขี่รถจักรยานยนต์ด้วยการประมวลผลภาพ
                                </Typography>
                            </Grid>
                            <br />
                            <Grid item xs={4} >
                                <Typography >
                                    ปี/เดือน/วัน : {date}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography>
                                    เวลา : {time}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography>
                                    สถานที่ : หน้าภาควิศวกรรมคอมพิวเตอร์
                                </Typography>
                            </Grid>
                            <Grid item xs={6} marginTop={4}>
                                <Typography>
                                    ผู้ที่สวมใส่หมวกกันน็อก : 12
                                </Typography>
                            </Grid>
                            <Grid item xs={6} marginTop={4}>
                                <Typography>
                                    ผู้ที่ไม่สวมใส่หมวกกันน็อก : 35
                                </Typography>
                            </Grid>
                            
                        </Grid>
                    </Grid>
                    {/* {displayImage} */}
                    <Grid item xs={12} marginTop={4}>
                    <img src={"http://localhost:3001/resources/upload/img/" + namepic} alt="image-Show" className={classes.imageshow} /> 
                    </Grid>
                    
                </Grid>
            </Container>
        </React.Fragment>
  
    )
}

export default PDFprint


