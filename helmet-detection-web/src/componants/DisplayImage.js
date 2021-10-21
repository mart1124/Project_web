import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    
    imageshow: {
        width: 620,
        height: 380
    }
    
  }));

export default function DisplayImage(props) {

    const { recordData } = props
    const classes = useStyles();
    return (
        <div>
            <img src={`http://localhost:3001/resources/upload/img/${recordData.dataName}`} alt="image-Show" className={classes.imageshow} />
        </div>
    )
}
