import React from "react"
import { useState } from "react"
import VisualCube from "./VisualCube"

interface AnimatorProps {
    solution: string,
    tempo?: number, // in ms
}

export default function VisualCubeAnimated(props: AnimatorProps){
    const [currentIndex, setCurrentIndex] = useState(0)
    const [playing, setPlaying] = useState(false)
    const [timerId, setTimerId] = useState(null)
    const solutionLength = props.solution.split(' ').length
    
    const handlePlay = () => {
        console.log('play');        
        setPlaying(true)
        let myCurrentIndex = currentIndex
        const timerId = setInterval(() => {
            if(myCurrentIndex < solutionLength){
                myCurrentIndex++
                setCurrentIndex(myCurrentIndex)
            }
            else {
                clearInterval(timerId)
                setPlaying(false)
            }
        }, (props.tempo || 500))
        
        setTimerId(timerId)
    }

    const handlePause = () => {
        clearInterval(timerId)
        setPlaying(false)
    }

    const handlePrevious = () => {
        console.log('previous'); 
        clearInterval(timerId)
        setPlaying(false)
        setCurrentIndex(Math.max(currentIndex - 1, 0))
    }

    const handleNext = () => {
        console.log('next');
        clearInterval(timerId)
        setPlaying(false)
        setCurrentIndex(Math.min(currentIndex + 1, solutionLength))
    }

    const currentSolution = props.solution.split(' ').slice(currentIndex).join(' ')

    return <div className="visual-cube-animator">
        <div className="cube">
            <VisualCube solution={currentSolution} />
        </div>
        <div className="actions">
            <button onClick={handlePrevious}>
                Prev
            </button>
            <button onClick={playing ? handlePause : handlePlay}>
                {playing ? 'Pause' : 'Play'}
            </button>
            <button onClick={handleNext}>
                Next
            </button>
            
        </div>
    </div>
}