import { Button, ButtonGroup, Paper, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { exerciseDB } from "../../database/index";
import ExerciseSelector from "./ExerciseSelector";

interface ExerciseFormProps {
    id: number
}

export default function ExerciseForm(props: ExerciseFormProps){
    const {id} = props
    const exerciseData = exerciseDB.getExercise(id)
    const [rest, setRest] = useState(30)
    const [duration, setDuration] = useState(30)
    const [repetition, setRepetition] = useState(10)
    const [durationOverRepetition, setDurationOverRepetition] = useState(true)

    return <div className="exercise-form">
        <Paper className="exercise-form-paper"
            elevation={5}
        >
            <ExerciseSelector />
            <div className="exercise-value">
                <div className="type-selector exercise-input">
                    <ButtonGroup fullWidth color="primary" aria-label="contained primary button group">
                        <Button
                            variant={durationOverRepetition ? 'contained' : 'outlined'}
                            onClick={() => setDurationOverRepetition(true)}
                            >Duration</Button>
                        <Button
                            variant={durationOverRepetition ? 'outlined' : 'contained'}
                            onClick={() => setDurationOverRepetition(false)}
                        >Repetition</Button>
                    </ButtonGroup>    
                </div>
                <div className="exercise-timings">
                    <div className="value-input exercise-input">
                        {durationOverRepetition 
                            ? <TextField     
                                id="exercise-duration"
                                label="Exercise duration"
                                type="number"
                                InputProps={{inputProps: { min: 0 }}}
                                fullWidth
                                onChange={(e) => setDuration(parseInt(e.target.value))}
                                value={duration} 
                            />
                            : <TextField 
                                id="exercise-repetitions"
                                label="Exercise reps"
                                type="number"
                                InputProps={{inputProps: { min: 0 }}}
                                fullWidth
                                onChange={(e) => setRepetition(parseInt(e.target.value))}
                                value={repetition} 
                            />
                        }
                    </div>

                    <div className="exercise-settings exercise-rest">
                        <TextField
                            id="exercise-rest"
                            label="Exercise rest time"
                            type="number"
                            InputProps={{inputProps: { min: 0 }}}
                            fullWidth
                            value={rest}
                            onChange={(e) => setRest(parseInt(e.target.value))}
                        />
                    </div>
                </div>
               
            </div>
        </Paper>
    </div>
}