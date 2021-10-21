import React from 'react'

function DisplayVideo(props) {

    const { recordData } = props
    
    return (
        <div>
            <video width="750" height="500" controls >
                <source src={`http://localhost:3600//api/stream/${recordData.dataName}`} type="video/mp4"/>
            </video>
        </div>
    )
}

export default DisplayVideo
