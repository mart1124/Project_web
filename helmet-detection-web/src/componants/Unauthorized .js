import React from 'react';
import { Link } from 'react-router-dom';


const Unauthorized = () => {
  return (
    <div className='container'>
      <center>
        <div>
            <h1>403 - You Shall Not Pass</h1>
            <p>Uh oh, Gandalf is blocking the way!<br />Maybe you have a typo in the url? Or you meant to go to a different location? Like...Hobbiton?</p>
        </div>
        <p><Link to='/'>Back to Home</Link></p>
      </center>
    </div>
  )
}

export default Unauthorized;