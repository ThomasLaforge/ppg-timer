import React, { useEffect, useState, useRef } from "react";
import { useRouteMatch } from "react-router-dom";
import useSound from 'use-sound';

import dayjs from "dayjs";

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import { IconButton, Paper } from "@material-ui/core";
import { PlayArrow, Pause } from "@material-ui/icons";

import { trainingsDB } from "../../database";
import Training, {ExecutorElementType} from "../../modules/Training";
import { ExerciseJsonData, REPETITION_DURATION } from "../../definitions";

import Page from "../../components/Page";

import './style.scss'
import beepSfx from '../../sounds/beep.mp3';


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
    }, [delay]);
  }

export default function Executor() {
    const [play, setPlay] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [executorIndex, setExecutorIndex] = useState(0)

    const [playBip] = useSound(beepSfx);
    
    const match = useRouteMatch("/executor/:trainingIndex");
    const params = match?.params as ExecuteRouteParams
    const {trainingIndex} = params
    const t = trainingsDB.get(trainingIndex)

    const training = new Training(t)
    console.log('training', training.executorList)
    const {executorList} = training
    const executorLength = executorList.length
    // const loopIndex = training.getLoopIndex(executorIndex)
    // const exerciseIndex = training.getExerciseIndexInCurrentLoop(executorIndex)
    const timelineItems: string[] = []
    // const timelineItems = training.getTimeLine(executorIndex)
    // const repetition = training.getRepetitionInCurrentLoop(executorIndex)
    // const loopRepetitions = t.data.loops[loopIndex].repetitions
    const elapsedTimeinSec = training.getElapsedTimeBefore(executorIndex) + currentTime
    const remainingTimeinSec = training.getRemainingTimeAfter(executorIndex) - currentTime
    const currentExecutorElement = executorIndex < executorLength ? executorList[executorIndex] : undefined
    const currentExercise: ExerciseJsonData = undefined // training.getExercise(executorIndex)
    const finished = !currentExecutorElement
    useInterval(() => {
        if(play && executorIndex < executorLength){
            console.log('play');
            const toExec = executorList[executorIndex]
            if(toExec.duration === REPETITION_DURATION){
                console.log('skip not duration exercise');
                setExecutorIndex(executorIndex + 1)
            }
            else {
                console.log('duration exercise');
                if(currentTime >= toExec.duration){
                    console.log('end of exercise => go next and reset current time');
                    setCurrentTime(0)
                    setExecutorIndex(executorIndex + 1)
                    if( (executorIndex + 1 === executorLength) || executorList[executorIndex + 1].duration === REPETITION_DURATION){
                        console.log('pause if next exercise is not duration one');
                        setPlay(false)
                    }
                }
                else {
                    console.log('next time');
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
            <div className="title">{t.data.name}</div>
            <div className="session-informations">
                <div className={"timer " + (finished ? 'timer-over' : 'timer-in-' + getTimerColor(currentExecutorElement.type))}>
                    <div className='current-loop-name'>
                        {/* loop {loopIndex} {loopRepetitions > 1 ? `(${ repetition }/${t.data.loops[loopIndex].repetitions})` : ''} */}
                    </div>
                    <div className="current-timer">{dayjs(finished ? 0 : Math.max(0, currentExecutorElement.duration - currentTime) * 1000).format('mm:ss')}</div>
                    
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
                            {!play 
                                ? <IconButton 
                                    className='play-btn'
                                    size='medium' aria-label="Play training" component="span"
                                    // onClick={() => setPlay(true)}
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
                    <img src={currentExercise?.img} />
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