import { ExerciseData } from "../definitions"

import Store from 'electron-store';

class Database {
    constructor(
        private db = new Store()
    ){}

    getElement(key: string, defaultValue: any){
        return (this.db.get('times') || defaultValue)
    }

    setElement(key: string, data: any){
        this.db.set(key, data)
    }
}

class ExerciseDB {

    getExerciseList(){
        return require('./exercise.json') as ExerciseData[]
    }

    getExercise(id: number){
        return this.getExerciseList().find(e => e.id === id)
    }

}

export const db = new Database()
export const exerciseDB = new ExerciseDB()