import { Paper, TextField } from "@material-ui/core";
import React, { useContext, useReducer } from "react";
import ExerciseForm from "./ExerciseForm";
import ExerciseSelector from "./ExerciseSelector";
import { CreatorDispatchActionType } from './reducer'
import { CreatorContext } from './index'
interface LoopFormProps {
    index: number
}

export default function LoopForm(props: LoopFormProps){
    const {index} = props
    const {state, dispatch} = useContext(CreatorContext)
    
    const {
        repetitions,
        rest,
        warmup,
        exercises
    } = state.loops[index]
    const loopSize = exercises.length
    const name = `loop ${index + 1}`

    return <Paper className="loop-form">
        <div className="loop-denomination">
            {name}
        </div>
        <div className="loop-settings">
            <div className="loop-settings-input">
                <TextField
                    id="loop-size"
                    label="Loop size"
                    type="number"
                    InputProps={{inputProps: { min: 1 }}}
                    fullWidth
                    value={loopSize.toString()}
                    onChange={(e) => {
                        dispatch({
                            type: CreatorDispatchActionType.UpdateLoopSize,
                            value: {
                                loopIndex: index,
                                number: parseInt(e.target.value)
                            }
                        })
                    }}
                />
            </div>

            <div className="loop-settings-input">
                <TextField
                    id="repetitions"
                    label="Repetitions"
                    type="number"
                    InputProps={{inputProps: { min: 1 }}}
                    fullWidth
                    value={repetitions.toString()}
                    onChange={(e) => {
                        dispatch({
                            type: CreatorDispatchActionType.UpdateLoopRepetitions,
                            value: {
                                loopIndex: index,
                                number: parseInt(e.target.value)
                            }
                        })
                    }}
                />
            </div>
            
            <div className="loop-settings-input">
                <TextField
                    id="warmup"
                    label="Warmup"
                    type="number"
                    InputProps={{inputProps: { min: 0 }}}
                    fullWidth
                    value={warmup.toString()}
                    onChange={(e) => {
                        dispatch({
                            type: CreatorDispatchActionType.UpdateLoopWarmup,
                            value: {
                                loopIndex: index,
                                number: parseInt(e.target.value)
                            }
                        })
                    }}
                />
            </div>

            <div className="loop-settings-input">
                <TextField
                    id="rest"
                    label="Rest time"
                    type="number"
                    InputProps={{inputProps: { min: 0 }}}
                    fullWidth
                    value={rest.toString()}
                    onChange={(e) => {
                        dispatch({
                            type: CreatorDispatchActionType.UpdateLoopRest,
                            value: {
                                loopIndex: index,
                                number: parseInt(e.target.value)
                            }
                        })
                    }}
                />
            </div>
        </div>
        <div className="loop-exercise-list">
            {new Array(loopSize).fill('').map( (_, exerciseIndex) => {
                const id = `${index}-${exerciseIndex}`
                return <ExerciseForm 
                    key={id} 
                    loopIndex={index} 
                    exerciseIndex={exerciseIndex}
                />
            })}
        </div>
    </Paper>
}