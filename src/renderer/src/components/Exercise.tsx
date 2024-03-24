import { ExerciseJsonData } from "@renderer/definitions"

const exerciceList = require('../database/exercise.json') as ExerciseJsonData[]

interface ExerciseProps {
    id: number,
    duration?: number,
    repetitions?: number
}

export default function Exercise(props: ExerciseProps){
    const {id, duration, repetitions} = props
    const exercise = exerciceList.find( e => e.id === id)!
    return <div className="exercise">
        <div className="exercise-name">
            {exercise.name}
        </div>
        {/* <img src={exercise.img} /> */}
        {exercise.defaultDuration 
            ? <div className="duration">
                {duration || exercise.defaultDuration}
            </div>
            : <div className="repetitions">
                {repetitions || exercise.defaultRepetitions}
            </div>
        }
    </div>
}