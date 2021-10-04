import React, { useState ,Component} from 'react'



export default class PDFprint extends Component {
    

    render() {
        
        console.log(this.props)
        const {test} = this.props


        return (
            <div>
                
                <div style={{textAlign:'center',paddingLeft:'30px',fontSize:'30px',color:'green'}}>Here's a print copy of data you entered :)</div>
                    <div style={{display:'flex',padding:'20px 20px 20px 50px '}} >
                        <div style={{color:'Red',paddingRight:'10px',fontSize:'22px'}}>Type:</div><div style={{fontSize:'22px'}}> {test} </div>
                    </div>
                    <div style={{display:'flex' ,padding:'20px 20px 20px 50px '}}>
                        <div style={{color:'Red',paddingRight:'10px',fontSize:'22px'}}>Name:</div><div style={{fontSize:'22px'}}></div>
                    </div >
                    <div style={{display:'flex',padding:'20px 20px 20px 50px '}}>
                        <div style={{color:'Red',paddingRight:'10px',fontSize:'22px'}}>URL:</div><div style={{fontSize:'22px'}}></div>
                </div>
                
               
            </div>
        )
    }
}

