import { exerciseDB } from "../../database";
import { 
    DEFAULT_EXERCISE_REST_TIME,
    DEFAULT_EXERCISE_REPETITIONS,
    DEFAULT_EXERCISE_DURATION, 
    DEFAULT_LOOP_REST_TIME,
    DEFAULT_LOOP_WARMUP,
    DEFAULT_LOOP_SIZE,
    DEFAULT_NB_LOOP
} from "../../definitions";

export interface ExerciseData {
    exerciseId: number,
    isDuration: boolean, // True = duration Else = Repetition
    value: number,
    rest: number
}

export interface LoopData {
    repetitions: number,
    rest: number,
    warmup: number,
    exercises: ExerciseData[]
}

export interface CreatorData {
    defaultExerciseDuration: number,
    defaultExerciseRepetions: number,
    defaultExerciseRest: number,
    loops: LoopData[],
    name: string
}


const DEFAULT_EXERCISE_DATA: ExerciseData = {
    exerciseId: 0,
    isDuration: true, // True = duration Else = Repetition
    value: DEFAULT_EXERCISE_DURATION,
    rest: DEFAULT_EXERCISE_REST_TIME
}

const DEFAULT_LOOP_DATA: LoopData = {
    repetitions: 1,
    rest: DEFAULT_LOOP_REST_TIME,
    warmup: DEFAULT_LOOP_WARMUP,
    exercises: new Array(DEFAULT_LOOP_SIZE)
        .fill('')
        .map( (_, i) => DEFAULT_EXERCISE_DATA)
}

export const DEFAULT_CREATOR_DATA: CreatorData = {
    name: '',
    defaultExerciseDuration: DEFAULT_EXERCISE_DURATION,
    defaultExerciseRepetions: DEFAULT_EXERCISE_REPETITIONS,
    defaultExerciseRest: DEFAULT_EXERCISE_REST_TIME,
    loops: new Array(DEFAULT_NB_LOOP)
        .fill('')
        .map( (_, i) => DEFAULT_LOOP_DATA)
}

interface CreatorDispatch {
    type: CreatorDispatchActionType,
    value: any
}

export enum CreatorDispatchActionType {
    UpdateName,
    UpdateNbLoop,
    UpdateDefaultExerciseDuration,
    UpdateDefaultExerciseRepetions,
    UpdateDefaultExerciseRest,
    UpdateLoopSize,
    UpdateLoopRepetitions,
    UpdateLoopRest,
    UpdateLoopWarmup,
    UpdateExerciseIsDuration,
    UpdateExerciseRest,
    UpdateExerciseId,
    UpdateExerciseValue,
    // InitUpdatorState
}

export const initialState = 0;

export const reducer = (state: CreatorData, action: CreatorDispatch) => {
  switch (action.type) {
    // case CreatorDispatchActionType.InitUpdatorState:
    //     return action.value
    case CreatorDispatchActionType.UpdateName:
        return {...state, name: action.value}
    case CreatorDispatchActionType.UpdateNbLoop:
        let { loops } = state
        const nbLoops = loops.length
        if(nbLoops > action.value){
            loops = loops.slice(0, action.value)
        }
        else {
            while(loops.length < action.value){
                loops.push(DEFAULT_LOOP_DATA)
            }
        }
        return {...state, loops}
    case CreatorDispatchActionType.UpdateDefaultExerciseDuration:
        return {...state, defaultExerciseDuration: action.value}
    case CreatorDispatchActionType.UpdateDefaultExerciseRepetions:
        return {...state, defaultExerciseRepetions: action.value}
    case CreatorDispatchActionType.UpdateDefaultExerciseRest:
        return {...state, defaultExerciseRest: action.value}
    // Loop settings
    case CreatorDispatchActionType.UpdateLoopSize:
        return {...state, loops: state.loops.map( (l, i) => {
            if(i === action.value.loopIndex){
                let { exercises } = l
                const loopSize = exercises.length
                if(loopSize > action.value.number){
                    exercises = exercises.slice(0, action.value.number)
                }
                else {
                    while(exercises.length < action.value.number){
                        exercises.push(DEFAULT_EXERCISE_DATA)
                    }
                }
                return {...l, loopSize: action.value.number, exercises}
            }
            else {
                return l
            }
        })}
    case CreatorDispatchActionType.UpdateLoopRepetitions:
        return {...state, loops: state.loops.map( (l, i) => {
            if(i === action.value.loopIndex){
                return {...l, repetitions: action.value.number}
            }
            else {
                return l
            }
        })}
    case CreatorDispatchActionType.UpdateLoopRest:
        return {...state, loops: state.loops.map( (l, i) => {
            if(i === action.value.loopIndex){
                return {...l, rest: action.value.number}
            }
            else {
                return l
            }
        })}
    case CreatorDispatchActionType.UpdateLoopWarmup:
        return {...state, loops: state.loops.map( (l, i) => {
            if(i === action.value.loopIndex){
                return {...l, warmup: action.value.number}
            }
            else {
                return l
            }
        })}
    case CreatorDispatchActionType.UpdateExerciseIsDuration:
        return {...state, loops: state.loops.map((l, i) => {
            if(i !== action.value.loopIndex){
                return l
            }
            else {
                return {...l, exercises: l.exercises.map((e, j) => {
                    if(j !== action.value.exerciseIndex){
                        return e
                    }
                    else {
                        return {...e, 
                            isDuration: action.value.value,
                            value: action.value.value ? state.defaultExerciseDuration : state.defaultExerciseRepetions                        }
                    }
                })}
            }
        })}
    case CreatorDispatchActionType.UpdateExerciseRest:
        return {...state, loops: state.loops.map((l, i) => {
            if(i !== action.value.loopIndex){
                return l
            }
            else {
                return {...l, exercises: l.exercises.map((e, j) => {
                    if(j !== action.value.exerciseIndex){
                        return e
                    }
                    else {
                        return {...e, rest: action.value.value}
                    }
                })}
            }
        })}
    case CreatorDispatchActionType.UpdateExerciseId:
        return {...state, loops: state.loops.map((l, i) => {
            if(i !== action.value.loopIndex){
                return l
            }
            else {
                return {...l, exercises: l.exercises.map((e, j) => {
                    if(j !== action.value.exerciseIndex){
                        return e
                    }
                    else {
                        const isDuration = true
                        return {...e, 
                            exerciseId: action.value.value,
                            isDuration,
                            value: isDuration ? state.defaultExerciseDuration : state.defaultExerciseRepetions
                              
                        }
                    }
                })}
            }
        })}
    case CreatorDispatchActionType.UpdateExerciseValue:
        return {...state, loops: state.loops.map((l, i) => {
            if(i !== action.value.loopIndex){
                return l
            }
            else {
                return {...l, exercises: l.exercises.map((e, j) => {
                    if(j !== action.value.exerciseIndex){
                        return e
                    }
                    else {
                        return {...e, value: action.value.value}
                    }
                })}
            }
        })}
    default: throw new Error('Unexpected action');
  }
};