import React, { useState } from 'react';
import { Nevbar } from './nevbar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Row, Col } from 'react-bootstrap'

const Home = props => {
    return (
       <div>
           <Nevbar />
           <h1>HOME PAGE</h1>
       </div>
    )
}

export default Home;
