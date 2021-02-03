export const DEFAULT_REST_TIME = 120 // in sec
export const DEFAULT_WARMUP = 120 // sec
export interface ExerciseData {
    name: string,
    id: number,
    img: string, // url/src format
    defaultRepetions?: number,
    defaultDuration?: number // in sec
}

export interface ExerciseConfigured {
    id: number,
    duration?: number,
    repetition?: number,
    rest: number
}

export interface Loop {
    exercises: ExerciseConfigured[]
}

export interface LoopConfigured extends Loop {
    repetition: number,
    rest: number,
    warmup: number,
    song?: string // url song
}
export interface Training {
    loops: LoopConfigured[]
}