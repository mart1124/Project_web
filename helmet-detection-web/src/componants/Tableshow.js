import React, {useState, useRef } from 'react'
// import * as ReactBootStrap from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TableFooter } from '@material-ui/core';
// import ReactToPrint from "react-to-print";
import { useReactToPrint } from 'react-to-print';
import PDFprint from './PDFprint';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

function Tableshow ({listVideo}) {
    const [refprint, setRefprint] = useState([]);
    const classes = useStyles();
    const componentRef = useRef();


    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    
    });

    function PrintPDF({printdata}) {
        useReactToPrint({ content: () => refprint });
        <div style={{display:'none'}}>
            <PDFprint printdata={printdata} ref={el => (setRefprint(el))} />
        </div>
        
    }

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
                                {/* <a href="#" onClick={PrintPDF({printdata: {item}} )} >Print PDF</a> */}
                                {/* <ReactToPrint content={() => refprint } /> */}
                                {/* <div style={{display:'none'}} >
                                <PDFprint type={item.type} name={item.name} url={item.data} ref={componentRef} />
                                </div> */}
                                {/* <PDFprint type={item.type} name={item.name} url={item.data} ref={componentRef}/> */}
                                {/* <ReactToPrint 
                                    key={item.id}
                                    trigger={() => <a href="#">Print PDF</a>}
                                    content={() => refprint}
                                />
                                <div style={{display:'none'}}>
                                    <PDFprint key={item.id} type={item.type} name={item.name} url={item.data}  ref={el => (setRefprint(el))} />
                                </div>  */}
                            </TableCell>
                            {/* <div style={{display:'none'}} >
                                <PDFprint type={item.type} name={item.name} url={item.data}/>
                            </div> */}
                        </TableRow>
                        
                    ))
                }
            </TableBody>
            {/* <TableFooter>
            <TableRow>
                <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                    inputProps: {
                    'aria-label': 'rows per page',
                    },
                    native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                />
            </TableRow>
            </TableFooter> */}
            </Table>
        </TableContainer>
        
    )
}

export default Tableshow

