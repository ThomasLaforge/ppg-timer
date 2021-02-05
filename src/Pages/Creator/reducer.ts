import { 
    DEFAULT_EXERCISE_REST_TIME,
    DEFAULT_EXERCISE_REPETITIONS,
    DEFAULT_EXERCISE_DURATION, 
    DEFAULT_LOOP_REST_TIME,
    DEFAULT_LOOP_WARMUP
} from "../../definitions";

interface LoopData {
    loopSize: number,
    repetitions: number,
    rest: number,
    warmup: number
}

interface CreatorData {
    nbLoops: number,
    defaultExerciseDuration: number,
    defaultExerciseRepetions: number,
    defaultExerciseRest: number,
    loops: LoopData[]
}

const DEFAULT_LOOP_DATA: LoopData = {
    loopSize: 4,
    repetitions: 1,
    rest: DEFAULT_LOOP_REST_TIME,
    warmup: DEFAULT_LOOP_WARMUP,
}

export const DEFAULT_CREATOR_DATA: CreatorData = {
    nbLoops: 1,
    defaultExerciseDuration: DEFAULT_EXERCISE_DURATION,
    defaultExerciseRepetions: DEFAULT_EXERCISE_REPETITIONS,
    defaultExerciseRest: DEFAULT_EXERCISE_REST_TIME,
    loops: [DEFAULT_LOOP_DATA]
}

interface CreatorDispatch {
    type: CreatorDispatchActionType,
    value: any
}

export enum CreatorDispatchActionType {
    UpdateNbLoop,
    UpdateDefaultExerciseDuration,
    UpdateDefaultExerciseRepetions,
    UpdateDefaultExerciseRest,
    UpdateLoopSize,
    UpdateLoopRepetitions,
    UpdateLoopRest,
    UpdateLoopWarmup,
}

export const initialState = 0;

export const reducer = (state: CreatorData, action: CreatorDispatch) => {
  switch (action.type) {
    // Global settings
    case CreatorDispatchActionType.UpdateNbLoop:
        let { loops, nbLoops } = state
        if(nbLoops > action.value){
            loops = loops.slice(0, action.value)
        }
        else {
            while(loops.length < action.value){
                loops.push(DEFAULT_LOOP_DATA)
            }
        }
        return {...state, nbLoops: action.value, loops}
    case CreatorDispatchActionType.UpdateDefaultExerciseDuration:
        return {...state, defaultExerciseDuration: action.value}
    case CreatorDispatchActionType.UpdateDefaultExerciseRepetions:
        return {...state, defaultExerciseRepetions: action.value}
    case CreatorDispatchActionType.UpdateDefaultExerciseRest:
        return {...state, defaultExerciseRest: action.value}
    // Loop settings
    case CreatorDispatchActionType.UpdateLoopSize:
        return {...state, loops: state.loops.map( (l, i) => {
            if(i === action.value.loopIindex){
                return {...l, loopSize: action.value.number}
            }
            else {
                return l
            }
        })}
    case CreatorDispatchActionType.UpdateLoopRepetitions:
        return {...state, loops: state.loops.map( (l, i) => {
            if(i === action.value.loopIindex){
                return {...l, loopSize: action.value.number}
            }
            else {
                return l
            }
        })}
    case CreatorDispatchActionType.UpdateLoopRest:
        return {...state, loops: state.loops.map( (l, i) => {
            if(i === action.value.loopIindex){
                return {...l, loopSize: action.value.number}
            }
            else {
                return l
            }
        })}
    case CreatorDispatchActionType.UpdateLoopWarmup:
        return {...state, loops: state.loops.map( (l, i) => {
            if(i === action.value.loopIindex){
                return {...l, loopSize: action.value.number}
            }
            else {
                return l
            }
        })}
    default: throw new Error('Unexpected action');
  }
};