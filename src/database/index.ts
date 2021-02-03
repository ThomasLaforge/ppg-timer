import { TimeDB } from "../definitions"

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

class TimeDatabase extends Database {

    setTimes(data: TimeDB[]){
        this.setElement('times', data)
    }

    getTimes(){
        return this.getElement('times', []) as TimeDB[]
    }

    getLastTimes(nb = 5){
        return this.getTimes().sort((a, b) => b.timestamp - a.timestamp).slice(0, nb)
    }
}

export const timeDB = new TimeDatabase()