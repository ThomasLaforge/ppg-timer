import React, { useReducer } from "react";
import LoopForm from "./LoopForm";
import Page from "../../components/Page";
import { TextField, Button, Paper } from "@material-ui/core";
import { TrainingData } from "../../definitions";

import './style.scss'
import { DEFAULT_CREATOR_DATA, reducer, CreatorDispatchActionType } from "./reducer";
import { trainingsDB } from "../../database";
import { useHistory, useRouteMatch } from "react-router-dom";
import { MD5 } from "crypto-js";
import { trainingsAPI } from "../../App";

export const CreatorContext = React.createContext(null);
export interface CreateRouteParams {
    trainingIndex?: number
}

export default function Creator(props: any){
    let initialState = DEFAULT_CREATOR_DATA
    const match = useRouteMatch("/creator/:trainingIndex");
    
    const params: CreateRouteParams = match?.params 
    const trainingIndex = params?.trainingIndex
    const updateMode = trainingIndex >= 0
    if(updateMode){
        const training = trainingsDB.get(trainingIndex)
        initialState = training.data
    }

    const [state, dispatch] = useReducer(reducer, initialState)
    const {
        defaultExerciseDuration,
        defaultExerciseRepetions,
        defaultExerciseRest,
        name
    } = state
    const nbLoops = state.loops.length
    const history = useHistory();
    
    const renderLoopForms  = () => {
        return <div className="loop-list">
            {new Array(nbLoops).fill('').map( (_, loopIndex) =>
                <LoopForm key={loopIndex} index={loopIndex} />
            )}   
        </div>
    }

    const saveTraining = () => {
        let index = updateMode ? trainingIndex : trainingsDB.count
        completeTraining('/home')
    }
    
    const startTraining = () => {
        let index = updateMode ? trainingIndex : trainingsDB.count
        completeTraining(`/executor/${index}`)
    }
    
    const completeTraining = async (redirectionPath: string) => {
        let training: TrainingData;
        console.log('complete training', {path: redirectionPath});
        
        if(updateMode && JSON.stringify(trainingsDB.get(trainingIndex).data) === JSON.stringify(state)) {
            history.push(redirectionPath)
            console.log('complete training 1');
        }
        else {
            if(updateMode){
                console.log('complete training 2');
                training = trainingsDB.update(trainingIndex, state)
            }
            else {
                training = trainingsDB.create(state)
            }
    
            console.log('complete training 3');

            const trainingHash = MD5(JSON.stringify(state)).toString()
            try{
                const apiTrainingsWithHash = await trainingsAPI
                    .where('hash', '==', trainingHash)
                    .get()
                if(apiTrainingsWithHash.docs.length < 1){
                    console.log('complete training 5');

                    trainingsAPI.add({
                        hash: trainingHash,
                        trainingData: JSON.stringify(state)
                    })
                }
                history.push(redirectionPath)
            }
            catch(e){
                // TODO: if not possible to reach api put work on localstorage / cache 
                console.log('complete training 6');
                history.push(redirectionPath)
            }
        }
    }

    return <Page title="creator">
        <CreatorContext.Provider value={{state, dispatch}}>
            <Paper className='creator-global-settings'>
                <div className="creator-global-settings-title">
                    Global settings
                </div>
                <div className="creator-global-settings-name">
                    <TextField
                        id="loop-name"
                        label="Name"
                        type="string"
                        fullWidth
                        value={name}
                        onChange={(e) => {    
                            dispatch({
                                type: CreatorDispatchActionType.UpdateName,
                                value: e.target.value
                            })
                        }}
                    />
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

            <div className="end-creation-actions">
                <Button
                    className='cancel-training-btn'
                    variant="outlined" 
                    color="primary"
                    onClick={() => history.push('/')}
                >Cancel</Button>
                
                <Button
                    className='save-training-btn'
                    variant="contained" 
                    color="primary"
                    onClick={saveTraining}
                >Save</Button>
                
                <Button
                    className='start-training-btn'
                    variant="contained" 
                    color="secondary"
                    onClick={startTraining}
                >Start</Button>
            </div>
        </CreatorContext.Provider>
    </Page>
}