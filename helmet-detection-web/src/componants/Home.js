import React, { useState, useEffect } from 'react';
import { Nevbar } from './nevbar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'

const Home = props => {
    const [test, setTest] = useState("ฟหฟห");

    // const homeData = async () => {
    //     const { data} = await axios('http://localhost:3001/home');
    //     console.log(data)
    //     setTest(data)
    // }
    // useEffect(() => {
        
    //     homeData();
        
    // }, []);

    return (
       <div>
           <h1>HOME PAGE</h1>
            {/* <h4>{JSON.stringify(test)}</h4> */}
       </div>
    )
}

export default Home;