import React, { createContext, useContext, useEffect, useState } from "react";
import LoopForm from "./LoopForm";
import Page from "../../components/Page";
import { TextField, Button, Paper } from "@material-ui/core";
import { DEFAULT_EXERCISE_DURATION, DEFAULT_EXERCISE_REPETITIONS, DEFAULT_EXERCISE_REST_TIME } from "../../definitions";

interface CreatorData {
    defaultDuration: number,
    defaultRepetions: number,
}

export const CreatorContext = createContext([])

import './style.scss'

export default function Creator(){
    const [creatorData, updateCreatorData] = useState('toto')
    const [nbLoops, setNbLoops] = useState(1)
    const [defaultDuration, setDefaultDuration] = useState(DEFAULT_EXERCISE_DURATION)
    const [defaultRepetions, setDefaultRepetions] = useState(DEFAULT_EXERCISE_REPETITIONS)
    const [defaultRest, setDefaultRest] = useState(DEFAULT_EXERCISE_REST_TIME)

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

    return <CreatorContext.Provider value={[creatorData, updateCreatorData]}>
    <Page title="creator">
        <React.Fragment>
            <Paper className='creator-global-settings'>
                <div className="creator-global-settings-title">
                    Global settings
                </div>

                <div className="creator-global-settings-input-list">
                    <div className="creator-global-settings-input">
                        <TextField
                            id="nb-loop"
                            label="Number of loops"
                            type="number"
                            InputProps={{inputProps: { min: 1 }}}
                            fullWidth
                            value={nbLoops}
                            onChange={(e) => {    
                                if(e.target.value && e.target.value.length > 0){
                                    const intValue = parseInt(e.target.value)
                                    if(!!intValue && intValue > 0){
                                        setNbLoops(parseInt(e.target.value))
                                    }
                                }
                            }}
                        />    
                    </div>
                    <div className="creator-global-settings-input">
                        <TextField
                            id="default-duration"
                            label="Default duration"
                            type="number"
                            InputProps={{inputProps: { min: 0 }}}
                            fullWidth
                            value={defaultDuration}
                            onChange={(e) => setDefaultDuration(parseInt(e.target.value))}
                        />    
                    </div>
                    <div className="creator-global-settings-input">
                        <TextField
                            id="default-repetions"
                            label="Default repetitions"
                            type="number"
                            InputProps={{inputProps: { min: 0 }}}
                            fullWidth
                            value={defaultRepetions}
                            onChange={(e) => setDefaultRepetions(parseInt(e.target.value))}
                        />    
                    </div>
                    <div className="creator-global-settings-input">
                        <TextField
                            id="default-rest"
                            label="Default rest time"
                            type="number"
                            InputProps={{inputProps: { min: 0 }}}
                            fullWidth
                            value={defaultRest}
                            onChange={(e) => setDefaultRest(parseInt(e.target.value))}
                        />    
                    </div>
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
</CreatorContext.Provider>    
}