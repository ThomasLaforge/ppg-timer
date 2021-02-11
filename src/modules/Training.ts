import { ExerciseData } from "../Pages/Creator/reducer";
import { exerciseDB, trainingsDB } from "../database";
import { EXERCISES_LENGTH_IN_TIMELINE, REPETITION_DURATION, TrainingData } from "../definitions";

export enum ExecutorElementType {
    Warmup,
    Exercise,
    Rest,
    LoopRest
}

export interface ExecutorElement {
    type: ExecutorElementType,
    duration: number,
    loopIndex?: number,
    repetition?: number,
    exerciseIndex?: number
}

export default class Training {
    public executorList: ExecutorElement[]

    constructor(
        public trainingData: TrainingData
    ){
        this.executorList = trainingData.data.loops.flatMap((l, loopIndex) => {
            let loopContent: ExecutorElement[] = []

            new Array(l.repetitions).fill('').forEach((_, repetition) => {
                l.exercises.forEach((e, exerciseIndex) => {
                    const meta = {
                        loopIndex,
                        repetition,
                        exerciseIndex
                    }
                    loopContent.push(Object.assign({
                        type: ExecutorElementType.Exercise,
                        duration: e.isDuration ? e.value : REPETITION_DURATION
                    }, meta))
                    loopContent.push(Object.assign({
                        type: ExecutorElementType.Rest,
                        duration: e.rest,
                    }, meta))
                })
                loopContent.push({
                    type: ExecutorElementType.LoopRest,
                    duration: l.rest,
                    loopIndex,
                    repetition
                })
            })
            
            return [
                {
                    type: ExecutorElementType.Warmup,
                    duration: l.warmup,
                    loopIndex
                }, 
                ...loopContent]
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

    getTimeLine(executorIndex: number): string[]{
        // TODO: Add loops starts
        let nextElements = this.executorList
            .slice(executorIndex)
            .filter(e => e.type === ExecutorElementType.Exercise)
            .slice(0, EXERCISES_LENGTH_IN_TIMELINE)
            .reduce( 
                (nextElements, e) => 
                    e.exerciseIndex === 0 && e.repetition === 0 
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
                return elapsedTime + e.duration
            }, 0)
    }

    getLoopIndex(executorIndex: number){
        return this.getExecutorElement(executorIndex).loopIndex
    }

    getExerciseIndexInCurrentLoop(executorIndex: number){
        return this.getExecutorElement(executorIndex).exerciseIndex
    }

    getRepetitionInCurrentLoop(executorIndex: number){
        return this.getExecutorElement(executorIndex).repetition + 1
    }
}