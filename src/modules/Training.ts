import { ExerciseData } from "../Pages/Creator/reducer";
import { exerciseDB, trainingsDB } from "../database";
import { EXERCISES_LENGTH_IN_TIMELINE, TrainingData } from "../definitions";

export interface ExecutorElement {
    loopIndex: number,
    loopRepetition: number,
    exerciseIndex: number
}

export default class Training {
    public executorList: ExecutorElement[]

    constructor(
        public trainingData: TrainingData
    ){
        this.executorList = trainingData.data.loops.flatMap((l, loopIndex) => {
            return new Array(l.repetitions).fill('').flatMap((_, loopRepetition) => {
                return l.exercises.flatMap((e, exerciseIndex) => {
                    return {
                        loopIndex,
                        loopRepetition,
                        exerciseIndex
                    }
                })
            })
        })
    }

    getExercisesList(){
        return this.trainingData.data.loops.reduce( (exercises, l) =>
            [...exercises, ...new Array(l.repetitions).fill('').flatMap( _ => l.exercises)]
        , [] as ExerciseData[])
    }

    getExerciseData(execurtorIndex: number){
        const e = this.executorList[execurtorIndex]
        return this.trainingData.data.loops[e.loopIndex].exercises[e.exerciseIndex]
    }

    getExercise(execurtorIndex: number){
        const e = this.executorList[execurtorIndex]
        const { exerciseId } = this.trainingData.data.loops[e.loopIndex].exercises[e.exerciseIndex]
        return exerciseDB.getExercise(exerciseId)
    }

    getTimeLine(executorIndex: number){
        // TODO: Add loops starts
        let nextElements = this.executorList
            .slice(executorIndex, executorIndex + EXERCISES_LENGTH_IN_TIMELINE)
            .reduce( 
                (nextElements, e) => 
                    e.exerciseIndex === 0 && e.loopRepetition === 0 
                        ? [...nextElements, { name: e.loopIndex}, e] 
                        : [...nextElements, e], 
            [])
            .slice(0, EXERCISES_LENGTH_IN_TIMELINE)
        return nextElements
            .map(e => {
                if(e.loopIndex || e.loopIndex === 0){
                    const { exerciseId } = this.trainingData.data.loops[e.loopIndex].exercises[e.exerciseIndex]
                    return exerciseDB.getExercise(exerciseId).name
                }
                else {
                    return e.name
                }
            })
    }

    getNbLoop(){
        return this.trainingData.data.loops.reduce( (res, l) => res + l.repetitions, 0)
    }

    getExecutorElement(executorIndex: number){
        return this.executorList[executorIndex]
    }

    getElapsedTimeBefore(executorIndex: number){
        return this.getTimeBetween(0, (executorIndex >= this.executorList.length) ? this.executorList.length - 1 : executorIndex)
    }
    
    getRemainingTimeAfter(executorIndex: number){
        return this.getTimeBetween(executorIndex)
    }

    getTotalTime(){
        return this.getRemainingTimeAfter(0);
    }
    
    getTimeBetween(startIndex: number, endIndex?: number){
        return this.executorList
            .slice(startIndex, endIndex)
            .reduce( (elapsedTime, e, i) => {
                const exerciseData = this.trainingData.data.loops[this.getLoopIndex(i + startIndex)].exercises[e.exerciseIndex]
                const exerciseTime = exerciseData.isDuration ? exerciseData.value : 0
                const exerciseRest = exerciseData.rest
                return elapsedTime + exerciseTime + exerciseRest
            }, 0)
    }

    getLoopIndex(executorIndex: number){
        return this.getExecutorElement(executorIndex).loopIndex
    }

    getExerciseIndexInCurrentLoop(executorIndex: number){
        return this.getExecutorElement(executorIndex).exerciseIndex
    }

    getRepetitionInCurrentLoop(executorIndex: number){
        return this.getExecutorElement(executorIndex).loopRepetition + 1
    }
}