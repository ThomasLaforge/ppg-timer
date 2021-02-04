import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Page from "../../components/Page";

import './style.scss'

// function Row(props: { row: ReturnType<typeof createData> }) {
//     const { row } = props;
//     const [open, setOpen] = React.useState(false);
//     const classes = useRowStyles();
  
//     return (
//       <React.Fragment>
//         <TableRow className={classes.root}>
//           <TableCell>
//             <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
//               {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//             </IconButton>
//           </TableCell>
//           <TableCell component="th" scope="row">
//             {row.name}
//           </TableCell>
//           <TableCell align="right">{row.calories}</TableCell>
//           <TableCell align="right">{row.fat}</TableCell>
//           <TableCell align="right">{row.carbs}</TableCell>
//           <TableCell align="right">{row.protein}</TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//             <Collapse in={open} timeout="auto" unmountOnExit>
//               <Box margin={1}>
//                 <Typography variant="h6" gutterBottom component="div">
//                   History
//                 </Typography>
//                 <Table size="small" aria-label="purchases">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Date</TableCell>
//                       <TableCell>Customer</TableCell>
//                       <TableCell align="right">Amount</TableCell>
//                       <TableCell align="right">Total price ($)</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {row.history.map((historyRow) => (
//                       <TableRow key={historyRow.date}>
//                         <TableCell component="th" scope="row">
//                           {historyRow.date}
//                         </TableCell>
//                         <TableCell>{historyRow.customerId}</TableCell>
//                         <TableCell align="right">{historyRow.amount}</TableCell>
//                         <TableCell align="right">
//                           {Math.round(historyRow.amount * row.price * 100) / 100}
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </Box>
//             </Collapse>
//           </TableCell>
//         </TableRow>
//       </React.Fragment>
//     );
//   }

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