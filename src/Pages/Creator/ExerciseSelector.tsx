import { MenuItem, Select } from "@material-ui/core"
import React, { useMemo, useState } from "react"
import { exerciseDB } from "../../database/index"


export default function ExerciseSelector(){
    const [exerciseId, setExerciseId] = useState(0)
    const exerciceList = useMemo(() => exerciseDB.getExerciseList(), [])

    return <Select
        className="exercise-selector exercise-input"
        value={exerciseId}
        onChange={(e) => setExerciseId(e.target.value as number)}
    >
        {exerciceList.map( (e, k) => {
            return <MenuItem key={k} value={k}>{e.name}</MenuItem>
        })}
    </Select>
}