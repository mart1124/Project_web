import React, {useState, useRef ,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableContainer, TableHead, 
    TableRow, Paper, TablePagination , TableFooter, Link } from '@material-ui/core';
// import ReactToPrint from "react-to-print";
import ReactToPrint, { PrintContextConsumer  } from 'react-to-print';
import PDFprint from './PDFprint';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

function Tableshow ({listVideo}) {
    const [refPrint, setRefPrint] = React.useState();
    const [page, setPage] = React.useState(2);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const classes = useStyles();
    // const handleprint = useReactToPrint ({
    //     content: () => refPrint,
    // });

    const handleClick = (event) => {
      <PDFprint key={event.id} name={event.name} data={event.data} ref={(el)=> setRefPrint(el)} />
       console.log(event)
    //    window.print()
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    };

    return (

        <TableContainer component={Paper} square = "true" >
        <Table className={classes.table} aria-label="Video table" >
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
                    listVideo.data && listVideo.data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                            {item.id}
                            </TableCell>
                            <TableCell >{item.type}</TableCell>
                            <TableCell >{item.name}</TableCell>
                            <TableCell >{item.data}</TableCell>
                            
                            <TableCell > 
                                {/* <ReactToPrint  

                                /> */}
                                <Link 
                                    href="#" 
                                    variant="body2"
                                    underline="always"
                                    onClick={(e) => handleClick(item, e)}>
                                    Print PDF
                                </Link>
                                

                            </TableCell>
            
                        </TableRow>
                        
                    ))
                }
            </TableBody>
            <TableFooter>
            <TableRow>
                <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={listVideo.data.length}
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
                />
            </TableRow>
            </TableFooter>
            </Table>
        </TableContainer>
        
    )
}

export default Tableshow

// listVideo.data && listVideo.data.map((item, index) => (
//     <TableRow key={item.id}>
//         <TableCell component="th" scope="row">
//         {item.id}
//         </TableCell>
//         <TableCell >{item.type}</TableCell>
//         <TableCell >{item.name}</TableCell>
//         <TableCell >{item.data}</TableCell>
        
//         <TableCell > 
//             {/* <ReactToPrint
//                 key={item.id} 
//                 trigger={() =>  <a href="#" >Print PDF</a> } /> */}
            
//             <a  key={item.id} href="#" onClick={handlePrint([item])} >Print PDF</a>
//             {/* <div style={{display:'none'}} >
//             <PDFprint key={item.id} name={item.name} data={item.data}
//             />
//             </div> */}
            
//         </TableCell>

//     </TableRow>