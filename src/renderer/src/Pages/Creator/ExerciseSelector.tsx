import { MenuItem, Select } from "@material-ui/core"
import React, { useMemo } from "react"
import { exerciseDB } from "../../database/index"

interface ExerciseSelectorProps {
    value: number,
    onChange: (event: React.ChangeEvent<{
        name?: string;
        value: string;
    }>, child: React.ReactNode) => void
}

export default function ExerciseSelector(props: ExerciseSelectorProps){
    const exerciceList = useMemo(() => exerciseDB.getExerciseList(), [])

    return <Select
        className="exercise-selector exercise-input"
        value={props.value}
        onChange={props.onChange}
    >
        {exerciceList.map( (e, k) => {
            return <MenuItem key={k} value={k}>{e.name}</MenuItem>
        })}
    </Select>
}