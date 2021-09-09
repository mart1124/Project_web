import React, {useState, useEffect} from 'react'
import * as ReactBootStrap from 'react-bootstrap'
import axios from 'axios'

function Tableshow ({listVideo}) {
    return (
        <ReactBootStrap.Table striped bordered hover>
            <thead>
                <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Name</th>
                <th>Url</th>
                </tr>
            </thead>
            <tbody>
                {
                    listVideo.data && listVideo.data.map((item) => (
                        <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.type}</td>
                        <td>{item.name}</td>
                        <td>{item.data}</td>
                        </tr>
                    ))
                }
            </tbody>
        </ReactBootStrap.Table>
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
