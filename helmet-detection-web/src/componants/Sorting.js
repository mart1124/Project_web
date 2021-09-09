import React, { useState, useEffect } from 'react';
import { Nevbar } from './nevbar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Row, Col, Table } from 'react-bootstrap'
import Tableshow from './Tableshow';
import axios from 'axios'


const Sorting = props => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [tebleData, setTebleData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    

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
        <div className="App">
            <Nevbar />
            <div>Test Data</div>
            <div>
            {/* value={startDate} onChange={(e) => setStartDate(e.target.value)} */}
            {/* <input type="date" name="startdate"  /> */}
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
            {/* <input type="date" name="enddate"  /> */}
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
            <button onClick={() => {
                getVideoFilter()
            }}>ค้นหา</button>
            </div>
            <div>
                < Tableshow listVideo={tebleData}/>
            </div>
        </div>
    )
}


export default Sorting
