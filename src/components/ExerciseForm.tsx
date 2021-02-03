import { Button, ButtonGroup, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { exerciseDB } from "../database/index";
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
        <ExerciseSelector />
        <div className="exercise-value">
            <div className="type-selector">
                <ButtonGroup color="primary" aria-label="contained primary button group">
                    <Button
                        variant={durationOverRepetition ? 'contained' : 'outlined'}
                        onClick={() => setDurationOverRepetition(false)}
                        >Duration</Button>
                    <Button
                        variant={durationOverRepetition ? 'outlined' : 'contained'}
                        onClick={() => setDurationOverRepetition(true)}
                    >Repetition</Button>
                </ButtonGroup>    
            </div>
            <div className="value-input">
                {durationOverRepetition 
                    ? <TextField 
                        id="exercise-repetitions"
                        label="exercise reps"
                        type="number"
                        onChange={(e) => setRepetition(parseInt(e.target.value))}
                        value={repetition} 
                    />
                    : <TextField     
                        id="exercise-duration"
                        label="exercise duration"
                        type="number"
                        onChange={(e) => setDuration(parseInt(e.target.value))}
                        value={duration} 
                    />
                }
            </div>
        </div>
        <div className="exercise-settings">
            <TextField
                id="exercise-rest"
                label="exercise rest time"
                type="number"
                value={rest}
                onChange={(e) => setRest(parseInt(e.target.value))}
            />
        </div>
    </div>
}