import React, { useState } from "react"
import KeyboardEventHandler from 'react-keyboard-event-handler';

import dayjs from 'dayjs'
// import { db } from "../index";

interface TimerProps {
    onEnd: Function
}

export default function Timer(props: TimerProps){
    const {onEnd} = props    
    const [startTime, setStartTime] = useState(0)
    const [timerId, setTimerId] = useState(null)
    const [lastTime, setLastTime] = useState(null)
    const [update, forceUpdate] = useState(0)
    const diff = startTime ? dayjs().subtract(startTime) : dayjs(lastTime || 0)
    const timerValue = diff.format('mm:ss:SSS')

    const handleStart = () => {
        clearTimeout(timerId)
        setStartTime(Date.now())
        const intervalId = setInterval(() => {
            forceUpdate(Date.now())
        }, 30)
        setTimerId(intervalId)
    }

    const handleStop = () => {
        clearTimeout(timerId)
        const result = dayjs().subtract(startTime)
        setLastTime(result)
        setStartTime(0)
        onEnd(result)
    }

    const handleKeyboardEvent = () => {
        if(startTime){
            handleStop()
        }
        else {
            handleStart()
        }
    }
    
    return <div className="timer">
        <div className="time">{timerValue}</div>
        
        <KeyboardEventHandler
            handleKeys={['space']}
            onKeyEvent={handleKeyboardEvent}
            handleEventType={'keyup'}
        />

    </div>
}