import React from 'react'

function DisplayVideo(prop) {

    const { id } = props
    
    return (
        <div>
            <video width="750" height="500" controls >
                <source src="./Videos/video1.mp4" type="video/mp4"/>
            </video>
        </div>
    )
}

export default DisplayVideo
