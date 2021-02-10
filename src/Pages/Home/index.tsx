import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Page from "../../components/Page";

import './style.scss'

// function Row(props: { row: ReturnType<typeof createData> }) {
//     const { row } = props;
//     const [open, setOpen] = React.useState(false);
//     const classes = useRowStyles();
  
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

export default function Home(){
    const [importLink, setImportLink] = useState('')

    return <Page title={'home'} >
        <React.Fragment>
            <div className="app-title">
                PPG Timer
            </div>

            <div className="import-module">
                <Paper elevation={1} className='import-module-paper'>
                    <TextField 
                        id="import-link"
                        label="Link to import routine"
                        className='import-module-input'
                        fullWidth
                        value={importLink}
                        onChange={(e) => setImportLink(e.target.value)}                
                    />
                    <Button 
                        className='import-module-btn'
                        variant="contained" 
                        color="primary"
                    >Importer</Button>
                </Paper>
            </div>

            <div className="training-history">
                <Paper elevation={1} className='training-history-paper'>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell></TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {/* {rows.map((row) => (
                            <Row key={row.name} row={row} />
                        ))} */}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </Paper>
            </div>
        </React.Fragment>
    </Page>
}