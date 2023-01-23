import { ExerciseJsonData, TrainingData } from "../definitions"

import Store from 'electron-store';
import { CreatorData } from "../Pages/Creator/reducer";

class Database {
    constructor(
        public db = new Store()
    ){}

    getElement(key: string, defaultValue: any){
        return (this.db.get(key) || defaultValue)
    }

    setElement(key: string, data: any){
        this.db.set(key, data)
    }
}

class ExerciseDB {

    getExerciseList(){
        return require('./exercises.json') as ExerciseJsonData[]
    }

    getExercise(id: number){
        return this.getExerciseList()[id]
    }

}

class TrainingsDB extends Database {
    create(data: CreatorData){
        const now = Date.now()
        const newTraining: TrainingData = {
            data,
            created_at: now,
            updated_at: now,
        }
        this.setElement('trainings', 
            [
                ...this.getElement('trainings', []),
                newTraining
            ]
        )
        return newTraining
    }

    update(key: number, data: CreatorData){
        const now = Date.now()
        const trainings = this.getAll()
        const trainingToUpdate = this.get(key)
        const updatedTraining: TrainingData = {
            ...trainingToUpdate,
            data,
            updated_at: now,
        }
        trainings[key] = updatedTraining
        this.setElement('trainings', trainings)
        return updatedTraining
    }

    remove(key: number){
        this.setElement('trainings', this.getAll().filter( (e, i) => i !== key))
    }

    reset(){
        this.setElement('trainings', [])
    }

    get(index: number){
        return this.getAll()[index]
    }

    getAll(){
        return this.getElement('trainings', []) as TrainingData[]
    }
    
    get count(){
        return this.getAll().length
    }
}

export const exerciseDB = new ExerciseDB()
export const trainingsDB = new TrainingsDB()