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
import Training from "../../modules/Training";

import Page from "../../components/Page";

import './style.scss'
// import boopSfx from './beep.mp3';

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
    const match = useRouteMatch("/executor/:trainingIndex");
    
    const params = match?.params as ExecuteRouteParams
    const {trainingIndex} = params
    const t = trainingsDB.get(trainingIndex)
    const training = new Training(t)
    
    const [play, setPlay] = useState(false)
    const [exerciseOverRest, setExerciseOverRest] = useState(true)
    const [intervalId, setintervalId] = useState(undefined)
    const [currentTime, setCurrentTime] = useState(0)
    const [executorIndex, setExecutorIndex] = useState(0)
    const [isRest, setIsRest] = useState(false)
    const executorLength = training.executorList.length
    const loopIndex = training.getLoopIndex(executorIndex)
    const timelineItems = training.getTimeLine(executorIndex)
    const exerciseIndex = training.getExerciseIndexInCurrentLoop(executorIndex)
    const reptition = training.getRepetitionInCurrentLoop(executorIndex)
    const elapsedTimeinSec = training.getElapsedTimeBefore(executorIndex) + currentTime
    const remainingTimeinSec = training.getRemainingTimeAfter(executorIndex) - currentTime
    const currentExercise = training.getExercise(executorIndex)
    const isRepetionExercise = true

    // const [playActive] = useSound(
    //     './beep.mp3',
    //     { volume: 0.25 }
    // );

    useInterval(() => {
        if(play){
            const nextTime = currentTime + 1
            if(currentTime >= 5){
                // playActive()
                setExerciseOverRest(!exerciseOverRest)
                setCurrentTime(0)
                setExecutorIndex(executorIndex + 1)
            } else {
                setCurrentTime(nextTime)
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
                <div className={"timer " + (exerciseOverRest ? 'timer-in-exercise' : 'timer-in-rest')}>
                    <div className='current-loop-name'>
                        loop {loopIndex}
                    </div>
                    <div className="current-timer">{dayjs(currentTime * 1000).format('mm:ss')}</div>
                    
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
                    <img src={currentExercise.img} />
                </div>
                <div className="exercise-text">
                    <div className="exercise-name">{currentExercise.name}</div>
                    <div className="exercise-describtion">
                        {currentExercise.describtion}</div>
                </div>
            </Paper>
        </React.Fragment>
    </Page>
}