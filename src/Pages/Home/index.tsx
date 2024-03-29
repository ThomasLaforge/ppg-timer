import React, { useMemo, useState } from "react";
import { Button, ButtonBase, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';
import { Link, useHistory } from "react-router-dom";
import { trainingsDB } from "../../database";
import Page from "../../components/Page";
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import MD5 from "crypto-js/md5";
import Training from '../../modules/Training'
import { useTranslation } from 'react-i18next';

import './style.scss'
import { TrainingData } from "../../definitions";
import dayjs from "dayjs";
import { trainingsAPI } from "../../App";
import { DeleteForever } from "@material-ui/icons";

export default function Home(){
    const [importHash, setImportHash] = useState('')
    const [updateTrainings, setUpdateTrainings] = useState(0)
    const [importing, setImporting] = useState(false)
    const [removing, setRemoving] = useState(false)
    const { t } = useTranslation();
    const history = useHistory()
    
    // trainingsDB.reset()
    let trainings: TrainingData[] = useMemo(() => trainingsDB.getAll(), [updateTrainings])
    const rows = trainings.map(({created_at, data}) => ({ created_at, name: data.name }))
    
    const importFromHash = () => {
        // setImporting(true)
        trainingsAPI
            .where('hash', '==', importHash)
            .get()
            .then((querySnapshot) => {
                if(querySnapshot.docs.length > 0){
                    const doc = querySnapshot.docs[0]
                    trainingsDB.create(JSON.parse(doc.data().trainingData))
                    trainings = trainingsDB.getAll()
                }
                else {
                    console.error('no data with this hash')
                }
                setImporting(false)
                setUpdateTrainings(Date.now())
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
                setImporting(false)
            });
    }

    const handleRemove = (index: number) => {
        // setRemoving(true)        
        trainingsDB.remove(index)
        // setRemoving(false)
        setUpdateTrainings(Date.now())
    }

    return <Page title={'home'} >
        <React.Fragment>
            <div className="app-title">
                {t('home.app-title')}
            </div>

            <div className="welcome">
                <Paper elevation={1} className="welcome-annouce">
                    <div className="welcome-annouce-msg">
                        {t('home.welcome.annouce')}
                    </div>
                    <div className="welcome-initial-actions-sentence">
                        {t('home.welcome.initial-actions-sentence')}
                    </div>
                </Paper>
                <div className='welcome-initial-actions'>
                    <div className="welcome-initial-actions-list">
                        <Paper elevation={1} className="creation-link">
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={() => history.push('./creator')}
                            >
                                {t('home.welcome.creation-link')}
                            </Button>
                        </Paper>
                        <Paper elevation={1} className="import-module">
                                <TextField 
                                    id="import-id"
                                    label={t('home.import-label')}
                                    className='import-module-input'
                                    fullWidth
                                    value={importHash}
                                    onChange={(e) => setImportHash(e.target.value)}                
                                />
                                <Button 
                                    className='import-module-btn'
                                    variant="contained" 
                                    color="primary"
                                    onClick={importFromHash}
                                >{t('home.import-btn')}</Button>
                        </Paper>
                    </div>
                </div>
            </div>

            <Paper elevation={1} className="training-history">
                <div className="training-history-title">{t('home.training-history-title')}</div>
                <Paper elevation={4} className="training-history-table-paper">
                    <Table aria-label="Training history">
                        <TableHead className='training-table-header'>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Date de création</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell>Code</TableCell>
                            <TableCell>Modify</TableCell>
                            <TableCell>Start</TableCell>
                            <TableCell>Remove</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row, k) => {
                            const tData = trainingsDB.get(k)
                            const training = new Training(tData)
                            return (
                            <TableRow key={k}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{dayjs(row.created_at).format('DD-MM-YYYY')}</TableCell>
                                <TableCell>{dayjs(training.getTotalTime() * 1000).format('mm:ss')}</TableCell>
                                <TableCell>{MD5(JSON.stringify(tData.data)).toString()}</TableCell>
                                <TableCell>
                                    <Link to={`/creator/${k}`}>
                                        <CreateIcon color='primary' />
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link to={`/executor/${k}`}>
                                        <FitnessCenterIcon color='primary' />
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <IconButton color="primary" aria-label="remove" component="span"
                                        onClick={() => handleRemove(k)}
                                    >
                                        <DeleteForever />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )})}
                        </TableBody>
                    </Table>
                </Paper>
            </Paper>
        </React.Fragment>
    </Page>
}