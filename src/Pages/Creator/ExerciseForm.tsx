import { Button, ButtonGroup, Paper, TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { CreatorContext } from ".";
import { exerciseDB } from "../../database/index";
import ExerciseSelector from "./ExerciseSelector";
import { CreatorDispatchActionType } from "./reducer";

interface ExerciseFormProps {
    loopIndex: number
    exerciseIndex: number
}

export default function ExerciseForm(props: ExerciseFormProps){
    const {loopIndex, exerciseIndex} = props
    const {state, dispatch} = useContext(CreatorContext)
    const {
        rest,
        exerciseId,
        isDuration,
        value,
    } = state.loops[loopIndex].exercises[exerciseIndex]

    return <div className="exercise-form">
        <Paper className="exercise-form-paper"
            elevation={5}
        >
            <ExerciseSelector 
                value={exerciseId} 
                onChange={e => {
                    dispatch({
                        type: CreatorDispatchActionType.UpdateExerciseId,
                        value: {
                            loopIndex,
                            exerciseIndex,
                            value: parseInt(e.target.value)
                        }
                    })
                }} 
            />
            <div className="exercise-value">
                <div className="type-selector exercise-input">
                    <ButtonGroup fullWidth color="primary" aria-label="contained primary button group">
                        <Button
                            variant={isDuration ? 'contained' : 'outlined'}
                            onClick={() => dispatch({
                                type: CreatorDispatchActionType.UpdateExerciseIsDuration,
                                value: {
                                    loopIndex,
                                    exerciseIndex,
                                    value: true
                                }
                            })}
                            >Duration</Button>
                        <Button
                            variant={isDuration ? 'outlined' : 'contained'}
                            onClick={() => dispatch({
                                type: CreatorDispatchActionType.UpdateExerciseIsDuration,
                                value: {
                                    loopIndex,
                                    exerciseIndex,
                                    value: false
                                }
                            })}
                        >Repetition</Button>
                    </ButtonGroup>    
                </div>
                <div className="exercise-timings">
                    <div className="value-input exercise-input">
                        <TextField 
                            id={isDuration 
                                ? 'exercise-duration'
                                : "exercise-repetitions"
                            }
                            label={isDuration 
                                ? "Exercise duration"
                                : "Exercise reps"
                            }
                            type="number"
                            InputProps={{inputProps: { min: 1 }}}
                            fullWidth
                            value={value.toString()} 
                            onChange={(e) => dispatch({
                                type: CreatorDispatchActionType.UpdateExerciseValue,
                                value: {
                                    loopIndex,
                                    exerciseIndex,
                                    value: parseInt(e.target.value)
                                }
                            })}
                        />
                    </div>

                    <div className="exercise-settings exercise-rest">
                        <TextField
                            id="exercise-rest"
                            label="Exercise rest time"
                            type="number"
                            InputProps={{inputProps: { min: 0 }}}
                            fullWidth
                            value={rest.toString()}
                            onChange={(e) => dispatch({
                                type: CreatorDispatchActionType.UpdateExerciseRest,
                                value: {
                                    loopIndex,
                                    exerciseIndex,
                                    value: parseInt(e.target.value)
                                }
                            })}
                        />
                    </div> 
                </div>
               
            </div>
        </Paper>
    </div>
}