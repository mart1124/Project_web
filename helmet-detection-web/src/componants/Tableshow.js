import React, {useState, useEffect} from 'react'
// import * as ReactBootStrap from 'react-bootstrap'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import ReactToPrint from "react-to-print";
import PDFprint from './PDFprint';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

function Tableshow ({listVideo}) {
    const [refprint, setRefprint] = useState("");
    const classes = useStyles();
    return (

        <TableContainer component={Paper} square = "true">
        <Table className={classes.table} aria-label="Video table">
            <TableHead>
            <TableRow >
                <TableCell align="">ID</TableCell>
                <TableCell align="left">Type</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Url form streaming</TableCell>
                <TableCell align="left">Action</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {
                    listVideo.data && listVideo.data.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell component="th" scope="row">
                            {item.id}
                            </TableCell>
                            <TableCell >{item.type}</TableCell>
                            <TableCell >{item.name}</TableCell>
                            <TableCell >{item.data}</TableCell>
                            <TableCell >
                                <ReactToPrint 
                                    trigger={() => <a href="#">Print PDF</a>}
                                    content={() => refprint}
                                />
                                <div style={{display:'none'}}>
                                    <PDFprint type={item.type} name={item.name} url={item.data}  ref={el => (setRefprint(el))} />
                                </div> 
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
        </TableContainer>
    )
}

export default Tableshow


// const Tableshow = (props) => {
//     const [tebleData, setTebleData] = useState({});
//     useEffect(() => {
//         const fetchData = async () => {
//             const { data} = await axios.post('http://localhost:3000/api/filter');
//             setTebleData(data) 
//             console.log(data)   
//         }
//         fetchData();
//     }, [])
//     return (
//         <div className="App">
//         {/* <span>{JSON.stringify(tebleData)}</span> */}
//         <ReactBootStrap.Table striped bordered hover>
//             <thead>
//                 <tr>
//                 <th>ID</th>
//                 <th>Type</th>
//                 <th>Name</th>
//                 <th>Url</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {
//                     tebleData.data && tebleData.data.map((item) => (
//                         <tr key={item.id}>
//                         <td>{item.id}</td>
//                         <td>{item.type}</td>
//                         <td>{item.name}</td>
//                         <td>{item.data}</td>
//                         </tr>
//                     ))
//                 }
//             </tbody>
//         </ReactBootStrap.Table>
//         </div>
//     )
// }

// export default Tableshow;
