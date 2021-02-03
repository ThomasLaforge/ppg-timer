import React, { useEffect, useState } from "react";
import * as SRScrambler from 'sr-scrambler'

import VisualCube from '../../components/VisualCube'
import Timer from '../../components/Timer';

import './style.scss'
import { timeDB as db } from "../../database/index";
import History from "../../components/History";

export default function Home(){
    const [scramble, setScramble] = useState(SRScrambler.generateHtmlScramble(3, 30))
    const [times, setTimes] = useState([])

    useEffect(() => {
        setTimes(db.getLastTimes())
    }, [scramble])

    const handleOnEnd = (time: number) => {
        const newTimes = [...times, {time: time, timestamp: Date.now()}]
        db.setTimes(newTimes)
        setScramble(SRScrambler.generateHtmlScramble(3, 30))
    }

    return <div className="home">
        <div className="speed-cubing">
            <div className="scramble">
                {scramble}
            </div>
            <div className="cube-scramble-check">
                <VisualCube
                    scramble={scramble}
                    background={'213461'}
                />
            </div>
            <div className="timer">
                <Timer onEnd={handleOnEnd} />
            </div>
        </div>
        <div className="stats"></div>
        <div className="history-data">
            <History data={times} />
        </div>
    </div>
}