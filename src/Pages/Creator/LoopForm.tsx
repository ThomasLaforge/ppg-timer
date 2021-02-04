import { Paper, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { DEFAULT_REST_TIME } from "../../definitions";
import ExerciseForm from "./ExerciseForm";
import ExerciseSelector from "./ExerciseSelector";

interface LoopFormProps {
    index: number,
}

export default function LoopForm(props: LoopFormProps){
    const {index} = props
    const [loopSize, setLoopSize] = useState(4)
    const [repetitions, setRepetition] = useState(1)
    const [rest, setRest] = useState(DEFAULT_REST_TIME)
    const [warmup, setWarmup] = useState(DEFAULT_REST_TIME)
    const [name, setName] = useState(`loop ${index + 1}`)
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
                    fullWidth
                    value={loopSize}
                    onChange={(e) => setLoopSize(parseInt(e.target.value))}
                />
            </div>

            <div className="loop-settings-input">
                <TextField
                    id="repetitions"
                    label="Repetitions"
                    type="number"
                    fullWidth
                    value={repetitions}
                    onChange={(e) => setRepetition(parseInt(e.target.value))}
                />
            </div>
            
            <div className="loop-settings-input">
                <TextField
                    id="warmup"
                    label="Warmup"
                    type="number"
                    fullWidth
                    value={warmup}
                    onChange={(e) => setWarmup(parseInt(e.target.value))}
                />
            </div>

            <div className="loop-settings-input">
                <TextField
                    id="rest"
                    label="Rest time"
                    type="number"
                    fullWidth
                    value={rest}
                    onChange={(e) => setRest(parseInt(e.target.value))}
                />
            </div>
        </div>
        <div className="loop-exercise-list">
            {new Array(loopSize).fill('').map( (_, exerciseIndex) => 
                <ExerciseForm 
                    id={0}
                    key={exerciseIndex}
                />
            )}
        </div>
    </Paper>
}