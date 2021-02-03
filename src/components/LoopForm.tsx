import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import { DEFAULT_REST_TIME } from "../definitions";
import ExerciseForm from "./ExerciseForm";
import ExerciseSelector from "./ExerciseSelector";

interface LoopFormProps {
    index: number,
}

export default function LoopForm(props: LoopFormProps){
    const {index} = props
    const [loopSize, setLoopSize] = useState(4)
    const [repetition, setRepetition] = useState(1)
    const [rest, setRest] = useState(DEFAULT_REST_TIME)
    const [warmup, setWarmup] = useState(DEFAULT_REST_TIME)
    const [name, setName] = useState(`loop ${index}`)
    return <div className="loop-form">
        <div className="loop-denomination">
            {name}
        </div>
        <div className="loop-settings">
            <TextField
                id="repetition"
                label="repetition"
                type="number"
                value={repetition}
                onChange={(e) => setRepetition(parseInt(e.target.value))}
            />
            
            <TextField
                id="warmup"
                label="warmup"
                type="number"
                value={warmup}
                onChange={(e) => setWarmup(parseInt(e.target.value))}
            />
            
            <TextField
                id="rest"
                label="rest"
                type="number"
                value={rest}
                onChange={(e) => setRest(parseInt(e.target.value))}
            />
        </div>
        <div className="loop-size-selector">
            <TextField
                id="loop-size"
                label="loop size"
                type="number"
                value={loopSize}
                onChange={(e) => setLoopSize(parseInt(e.target.value))}
            />
        </div>
        <div className="loop-exercise-list">
            {new Array(loopSize).fill('').map( (_, loopIndex) => 
                <ExerciseForm id={0} />
            )}
        </div>
    </div>
}