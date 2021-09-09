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
    const [inputData, setInputData] = useState("");
    const [tebleData, setTebleData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    

    const fetchData = async () => {
            // fetch("http://localhost:3000/api/filter")
            // .then((res) => res.json())
            // .then((json) => setTebleData(json));

            const { data} = await axios.post('http://localhost:3000/api/filter');
            setTebleData(data)
            setIsLoaded(true)
            setError(error);
            console.log(data)   
        }
    useEffect(() => {
        
        fetchData();
        
    }, []);

    console.log("test= ", tebleData.data)

    

    
    function search(rows) {
        return rows.filter((row) => row.name.toLowerCase().indexOf(inputData.toLowerCase()) > -1)
    }
    if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
            <div className="App">
                <Nevbar />
                <div>Test Data</div>
                <div>
                    <input type="text" name="test" value={inputData} onChange={(e) => setInputData(e.target.value)} /> 
                    {/* <button type="submit">ค้นหา</button> */}
                </div>
                <div>
                    < Tableshow data={search(tebleData.data)}/>
                </div>
            </div>
            // <div className="App">
            // <Nevbar />
            // <h1>Test Fliter</h1>
            // <form action="/api/filter" method="post">
            // <input type="text" name="test"/> 
            //     <div className="form-group">
            //     <label htmlFor="startdate" className='mt-2 ml-2'>Select Date :</label>
            //     <DatePicker
            //         name="startdate"
            //         todayButton="ToDay" 
            //         selected={startDate} 
            //         onChange={(date) => setStartDate(date)}
            //         dateFormat="yyyy-dd-MM"
            //         showMonthDropdown />
            //     {/* <input type="time" name='time' placeholder="time" /> */}
            //     <span className="mr-2">TO</span>
            //     <DatePicker 
            //         name="enddate"
            //         todayButton="ToDay"
            //         selected={endDate} 
            //         onChange={(date) => setEndDate(date)}
            //         dateFormat="dd/MM/yyyy"
            //         showMonthDropdown /> 
            //         <button type="submit">ค้นหา</button>
            //     </div>
                    
            // </form>
            // <Tableshow />
            // </div>
        )
    }
}

export default Sorting
