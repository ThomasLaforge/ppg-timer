import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useMatch } from "react-router-dom";
import useSound from 'use-sound';
import KeyboardEventHandler from 'react-keyboard-event-handler';

import dayjs from "dayjs";

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';

import { IconButton, Paper } from "@material-ui/core";
import { PlayArrow, Pause, Create, Home, Refresh, SkipPrevious, SkipNext } from "@material-ui/icons";

import { exerciseDB, trainingsDB } from "../../database";
import Training, {ExecutorElementType} from "../../modules/Training";

import Page from "../../components/Page";

import './style.scss'
import beepSfx from '../../sounds/beep.mp3';
import bigBeepSfx from '../../sounds/beep_long.mp3';
import { ExerciseJsonData, REPETITION_DURATION } from "@renderer/definitions";

function getTimerColor(type: ExecutorElementType){
    switch (type) {
        case ExecutorElementType.Warmup:
            return 'warmup'
        case ExecutorElementType.Exercise:
            return 'exercise'
        case ExecutorElementType.Rest:
            return 'rest'
        case ExecutorElementType.LoopRest:
            return 'loop-rest'
        default:
            return '';
    }
}

interface ExecuteRouteParams {
    trainingIndex: number
}

function useInterval(callback: Function, delay: number) {
    const savedCallback = useRef();
  
    // Se souvenir de la dernière fonction de rappel.
    useEffect(() => {
        // @ts-ignore
        savedCallback.current = callback;
    });
  
    // Configurer l’intervalle.
    useEffect(() => {
        function tick() {
            // @ts-ignore
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
        
        // Add a return statement here
        return () => {};
    }, [delay]);
  }

export default function Executor() {
    const [play, setPlay] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [executorIndex, setExecutorIndex] = useState(0)

    const navigate = useNavigate()
    const [playBip] = useSound(beepSfx);
    const [playBigBip] = useSound(bigBeepSfx);
    
    const match = useMatch("/executor/:trainingIndex");
    // @ts-ignore
    const params = match?.params as ExecuteRouteParams
    const {trainingIndex} = params
    const t = trainingsDB.get(trainingIndex)

    const training = new Training(t)
    // console.log('training', training.executorList)
    const {executorList} = training
    const executorLength = executorList.length
    const timelineItems = training.getTimeLine(executorIndex)
    const elapsedTimeinSec = training.getElapsedTimeBefore(executorIndex) + currentTime
    const remainingTimeinSec = training.getRemainingTimeAfter(executorIndex) - currentTime
    const currentExecutorElement = executorIndex < executorLength ? executorList[executorIndex] : undefined
    const currentExercise: ExerciseJsonData | undefined = (currentExecutorElement && currentExecutorElement.type === ExecutorElementType.Exercise)
        ? exerciseDB.getExercise(t.data.loops[currentExecutorElement.loopIndex!].exercises[currentExecutorElement.exerciseIndex!].exerciseId) 
        : undefined
    const finished = !currentExecutorElement

    useInterval(() => {
        if(play && executorIndex < executorLength){
            const toExec = executorList[executorIndex]
            if(toExec.duration === REPETITION_DURATION){
                // console.log('skip not duration exercise');
                setExecutorIndex(executorIndex + 1)
            }
            else {
                if(currentTime >= toExec.duration){
                    // end of exercise => go next and reset current time
                    setCurrentTime(0)
                    const nextIndex = executorIndex + 1 
                    setExecutorIndex(nextIndex)

                    // end
                    if( nextIndex === executorLength) {
                        setPlay(false)
                    } 
                    // next is exercise type = repetition
                    else if(executorList[nextIndex].duration === REPETITION_DURATION){
                        // pause if next exercise is not duration one');
                        setPlay(false)
                        playBip()
                    }
                    // bip to announce start of new exercise
                    else if(executorList[nextIndex].type === ExecutorElementType.Exercise){
                        playBip()
                    }
                }
                else {
                    // Bip 3 last seconds
                    if(toExec.type === ExecutorElementType.Exercise){
                        if(toExec.duration - currentTime <= 4){
                            // Long bip if last second
                            if(toExec.duration - currentTime === 1){
                                playBigBip()
                            }
                            else {
                                playBip()
                            }
                        }
                        // Bip at half time of exercise with split property
                        else if(currentExercise?.split && Math.ceil(toExec.duration / 2) === currentTime + 1){
                            playBip()
                        }
                    }
                    
                    setCurrentTime(currentTime + 1)
                }
            }
        }
    }, 1000)

    const start = () => {
        setPlay(true)
    }

    const pause = () => {
        setPlay(false)
    }

    return <Page title='executor'>
        <React.Fragment>
            <KeyboardEventHandler
                handleKeys={['space']}
                onKeyEvent={() => {
                    if(currentExecutorElement && currentExecutorElement.type === ExecutorElementType.Exercise && currentExecutorElement.duration === REPETITION_DURATION){
                        setExecutorIndex(executorIndex + 1)}
                        setPlay(true)
                    }
                }
                handleEventType={'keyup'}
            />

            <div className="info-bar">
                <div className="title">{t.data.name}</div>
                <div className="info-bar-actions">
                    <IconButton className='actions-btn home-btn' onClick={() => navigate('/')}>
                        <Home />
                    </IconButton>
                    <IconButton className='actions-btn creator-btn' onClick={() => navigate(`/creator/${trainingIndex}`)}>
                        <Create />
                    </IconButton>
                    <IconButton className='actions-btn refresh-btn' 
                        onClick={() => {
                            setCurrentTime(0)
                            setExecutorIndex(0)
                            setPlay(false)    
                        }}
                    >
                        <Refresh />
                    </IconButton>
                </div>
            </div>
            <div className="session-informations">
                <div className={"timer " + (finished ? 'timer-over' : 'timer-in-' + getTimerColor(currentExecutorElement.type))}>
                    <div className='current-loop-name'>
                        {/* loop {loopIndex} {loopRepetitions > 1 ? `(${ repetition }/${t.data.loops[loopIndex].repetitions})` : ''} */}
                    </div>
                    <div className="current-timer">
                    {
                        (currentExecutorElement && currentExecutorElement.duration === REPETITION_DURATION) 
                            ? t.data.loops[currentExecutorElement.loopIndex!].exercises[currentExecutorElement.exerciseIndex!].value
                            : dayjs(finished ? 0 : Math.max(0, currentExecutorElement.duration - currentTime) * 1000).format('mm:ss')
                    }
                    </div>
                    
                    <div className="training-timer-info">
                        <div className="elapsed-box">
                            <div className="elapsed-box-title">
                                Elapsed
                            </div>
                            <div className="elapsed-box-value">
                                {dayjs(elapsedTimeinSec * 1000).format('mm:ss')}
                            </div>
                        </div>

                        <div className="timer-actions">
                            <div className="secondary-actions">
                                <IconButton 
                                    className='skip-previous-btn'
                                    size='medium' aria-label="Skip previous" component="span"
                                    onClick={() => {
                                        if(executorIndex > 0){
                                            setCurrentTime(0)  
                                            setPlay(true)  
                                            setExecutorIndex(executorIndex - 1)
                                        }
                                    }}
                                >
                                    <SkipPrevious className='action-btn-icon' fontSize='large' />
                                </IconButton>
                            </div>
                            <div className="main-action">
                                {!play 
                                    ? <IconButton 
                                        className='play-btn'
                                        size='medium' aria-label="Play training" component="span"
                                        onClick={start}
                                    >
                                        <PlayArrow className='action-btn-icon' fontSize='large' />
                                    </IconButton>
                                    : <IconButton 
                                        className='pause-btn'
                                        size='medium' aria-label="Pause training" component="span"
                                        onClick={pause}
                                    >
                                        <Pause className='action-btn-icon' fontSize='large' />
                                    </IconButton>
                                }
                            </div>
                            <div className="secondary-actions">
                                <IconButton 
                                    className='skip-next-btn'
                                    size='medium' aria-label="Skip next" component="span"
                                    onClick={() => {
                                        if(executorIndex < executorLength - 1){
                                            setCurrentTime(0)  
                                            setPlay(true)  
                                            setExecutorIndex(executorIndex + 1)
                                        }
                                    }}
                                >
                                    <SkipNext className='action-btn-icon' fontSize='large' />
                                </IconButton>
                            </div>
                        </div>

                        <div className="remaining-box">
                            <div className='remaining-box-title'>remaining-box</div>
                            <div className="remaining-box-value">
                                {dayjs(remainingTimeinSec * 1000).format('mm:ss')}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="timeline-container">
                    <Timeline align='left'>
                        {timelineItems.map((item, k) => 
                            <TimelineItem key={k}>
                                <TimelineSeparator>
                                    <TimelineDot color={k === 0 ? 'primary' : 'grey'} />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>{item}</TimelineContent>
                            </TimelineItem>
                        )}
                    </Timeline>
                </div>
            </div>
            <Paper className="exercise-informations">
                <div className="exercise-image">
                    {currentExercise && <img src={currentExercise.img} />}
                </div>
                <div className="exercise-text">
                    <div className="exercise-name">{currentExercise?.name}</div>
                    <div className="exercise-describtion">
                        {currentExercise?.describtion}</div>
                </div>
            </Paper>            
        </React.Fragment>
    </Page>
}