import React, { useMemo, useState } from "react";
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@material-ui/core";
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from "react-router-dom";
import { trainingsDB } from "../../database";
import Page from "../../components/Page";
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import MD5 from "crypto-js/md5";
import Training from '../../modules/Training'

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
                PPG Timer
            </div>

            <div className="import-module">
                <Paper elevation={1} className='import-module-paper'>
                    <TextField 
                        id="import-id"
                        label="Id to import routine"
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
                    >Importer</Button>
                </Paper>
            </div>

            <Paper elevation={1} className="training-history">
                <div className="training-history-title">Trainings list</div>
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
                                        <SettingsIcon/>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link to={`/executor/${k}`}>
                                        <FitnessCenterIcon/>
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