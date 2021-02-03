import React, { useEffect, useState } from "react";
import TextField from '@material-ui/core/TextField';

import './style.scss'
import ExerciseSelector from "../../components/ExerciseSelector";
import { Link } from "react-router-dom";
import LoopForm from "../../components/LoopForm";

export default function Creator(){
    const [nbLoops, setNbLoops] = useState(1)

    const renderLoopForms  = () => {
        console.log({nbLoops})
        return <div className="loop-list">
            {new Array(nbLoops).fill('').map( (_, loopIndex) =>
                <LoopForm index={loopIndex} />
            )}   
        </div>
    }

    return <div className="creator">
        <h1>PPG Timer - Creator</h1>
        <Link to='/'>Back Home</Link>

        <TextField
          id="nb-loop"
          label="nomber of loops"
          type="number"
          value={nbLoops}
          onChange={(e) => setNbLoops(parseInt(e.target.value))}
        />
        
        { renderLoopForms() }
    </div>
}