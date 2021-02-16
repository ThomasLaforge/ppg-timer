import { CreatorData } from "./Pages/Creator/reducer"

export const DEFAULT_NB_LOOP = 1
export const DEFAULT_LOOP_REST_TIME = 120 // in sec
export const DEFAULT_LOOP_WARMUP = 0 // sec
export const DEFAULT_LOOP_SIZE = 3
export const DEFAULT_EXERCISE_REPETITIONS = 10
export const DEFAULT_EXERCISE_REST_TIME = 30 // in sec
export const DEFAULT_EXERCISE_DURATION = 30 // in sec
export const EXERCISES_LENGTH_IN_TIMELINE = 5
export const REPETITION_DURATION = -1
export interface ExerciseJsonData {
    name: string,
    img?: string, // url/src format
    describtion?: number
}

export interface ExerciseConfigured {
    duration?: number,
    repetitions?: number,
    rest: number
}

export interface Loop {
    exercises: ExerciseConfigured[]
}

export interface LoopConfigured extends Loop {
    repetitions: number,
    rest: number,
    warmup: number,
    song?: string // url song
}

export interface TrainingData {
    data: CreatorData,
    created_at: number,
    updated_at: number,
    note?: number,
}

export const mainColor = '#1F2443'