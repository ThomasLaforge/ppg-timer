import React, { useEffect, useState } from "react";
import TextField from '@material-ui/core/TextField';

import './style.scss'
import { Link } from "react-router-dom";
import LoopForm from "./LoopForm";
import Page from "../../components/Page";
import { Button, Paper, Typography } from "@material-ui/core";

export default function Creator(){
    const [nbLoops, setNbLoops] = useState(1)

    const renderLoopForms  = () => {
        return <div className="loop-list">
            {new Array(nbLoops).fill('').map( (_, loopIndex) =>
                <LoopForm 
                    index={loopIndex} 
                    key={loopIndex}
                />
            )}   
        </div>
    }

    const saveTraining = () => {
        console.log('training')
    }

    return <Page title="creator">
        <React.Fragment>
            <Paper className='creator-global-settings'>
                <div className="creator-global-settings-title">
                    Global settings
                    </div>
                <div className="creator-global-settings-input">
                    <TextField
                        id="nb-loop"
                        label="Number of loops"
                        type="number"
                        fullWidth
                        value={nbLoops}
                        onChange={(e) => setNbLoops(parseInt(e.target.value))}
                    />    
                </div>
            </Paper>
            
            { renderLoopForms() }

            <Button
                className='save-training-btn'
                variant="contained" 
                color="primary"
                onClick={saveTraining}
            >Save Training</Button>
        </React.Fragment>
    </Page>
}