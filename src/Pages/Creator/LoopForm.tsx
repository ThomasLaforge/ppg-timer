import { Paper, TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { CreatorContext } from "./index";
import { DEFAULT_LOOP_REST_TIME, DEFAULT_LOOP_WARMUP } from "../../definitions";
import ExerciseForm from "./ExerciseForm";
import ExerciseSelector from "./ExerciseSelector";

interface LoopFormProps {
    index: number,
}

export default function LoopForm(props: LoopFormProps){
    const [creatorData, setCreatorData] = useContext(CreatorContext)
    const {index} = props
    const [loopSize, setLoopSize] = useState(4)
    const [repetitions, setRepetition] = useState(1)
    const [rest, setRest] = useState(DEFAULT_LOOP_REST_TIME)
    const [warmup, setWarmup] = useState(DEFAULT_LOOP_WARMUP)
    const [name, setName] = useState(`loop ${index + 1}`)
    return <Paper className="loop-form">
        <div className="loop-denomination">
            {name} - {creatorData}
        </div>
        <div className="loop-settings">
            <div className="loop-settings-input">
                <TextField
                    id="loop-size"
                    label="Loop size"
                    type="number"
                    InputProps={{inputProps: { min: 0 }}}
                    fullWidth
                    value={loopSize}
                    onChange={(e) => {
                        setCreatorData('tata')
                        setLoopSize(parseInt(e.target.value))
                    }}
                />
            </div>

            <div className="loop-settings-input">
                <TextField
                    id="repetitions"
                    label="Repetitions"
                    type="number"
                    InputProps={{inputProps: { min: 0 }}}
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
                    InputProps={{inputProps: { min: 0 }}}
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
                    InputProps={{inputProps: { min: 0 }}}
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