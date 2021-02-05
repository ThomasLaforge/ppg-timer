import React, { useReducer, useState } from "react";
import LoopForm from "./LoopForm";
import Page from "../../components/Page";
import { TextField, Button, Paper } from "@material-ui/core";
import { DEFAULT_EXERCISE_DURATION, DEFAULT_EXERCISE_REPETITIONS, DEFAULT_EXERCISE_REST_TIME } from "../../definitions";

import './style.scss'
import { DEFAULT_CREATOR_DATA, reducer, CreatorDispatchActionType } from "./reducer";

export default function Creator(){
    const [state, dispatch] = useReducer(reducer, DEFAULT_CREATOR_DATA)
    const {
        nbLoops,
        defaultExerciseDuration,
        defaultExerciseRepetions,
        defaultExerciseRest
    } = state
    
    const renderLoopForms  = () => {
        return <div className="loop-list">
            {new Array(nbLoops).fill('').map( (_, loopIndex) =>
                <LoopForm key={loopIndex} index={loopIndex} />
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

                <div className="creator-global-settings-input-list">
                    <div className="creator-global-settings-input">
                        <TextField
                            id="nb-loop"
                            label="Number of loops"
                            type="number"
                            InputProps={{inputProps: { min: 1 }}}
                            fullWidth
                            value={nbLoops.toString()}
                            onChange={(e) => {    
                                if(e.target.value && e.target.value.length > 0){
                                    const intValue = parseInt(e.target.value)
                                    if(!!intValue && intValue > 0){
                                        dispatch({
                                            type: CreatorDispatchActionType.UpdateNbLoop,
                                            value: parseInt(e.target.value)
                                        })
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
                            value={defaultExerciseDuration.toString()}
                            onChange={(e) => dispatch({
                                type: CreatorDispatchActionType.UpdateDefaultExerciseDuration,
                                value: parseInt(e.target.value)
                            })}
                        />    
                    </div>
                    <div className="creator-global-settings-input">
                        <TextField
                            id="default-repetions"
                            label="Default repetitions"
                            type="number"
                            InputProps={{inputProps: { min: 0 }}}
                            fullWidth
                            value={defaultExerciseRepetions.toString()}
                            onChange={(e) => dispatch({
                                type: CreatorDispatchActionType.UpdateDefaultExerciseRepetions,
                                value: parseInt(e.target.value)
                            })}
                        />    
                    </div>
                    <div className="creator-global-settings-input">
                        <TextField
                            id="default-rest"
                            label="Default rest time"
                            type="number"
                            InputProps={{inputProps: { min: 0 }}}
                            fullWidth
                            value={defaultExerciseRest.toString()}
                            onChange={(e) => dispatch({
                                type: CreatorDispatchActionType.UpdateDefaultExerciseRest,
                                value: parseInt(e.target.value)
                            })}
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
}