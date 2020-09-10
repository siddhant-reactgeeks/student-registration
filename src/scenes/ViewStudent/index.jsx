import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { initialState, tableData } from './constants';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Paper, Avatar} from '@material-ui/core';

import { connect } from 'react-redux';
import './index.css'

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const FirstQuarter = (props) => {
    const [studentData, setStudentData] = React.useState(initialState);

    const classes = useStyles();

    const { playerList } = props;
    
    React.useEffect(() => {
        setStudentData(playerList)
    }, [playerList])

    if (playerList.length < 1) {
        return (
            <div>
                Not enough students at least 1 student is required!
            </div>
        )
    }

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    {tableData.map((obj) => <TableCell>{obj}</TableCell>)}
                </TableRow>
                </TableHead>
                <TableBody>
                {playerList.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell> 
                            {row.profileImages.map((image) =>  {
                            const url = URL.createObjectURL(image);
                                return  <Avatar alt="Profile Image" src={url} className={classes.large} />
                                }     
                            )} 
                        </TableCell>
                        <TableCell> {row.firstName}{' '+row.lastName} </TableCell>
                        <TableCell>{row.fatherName}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.address}</TableCell>
                        <TableCell>{row.mobileNumber}</TableCell>
                        <TableCell>{row.gender}</TableCell>
                        <TableCell>{row.dob}</TableCell>
                        <TableCell>{row.country}</TableCell>
                        <TableCell>{row.id}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </form>
    );
}


const mapStateToProps = (state) => ({
    playerList: state.createStudent.playerList
});
const mapDispatchToProps = (dispatch) => ({
});

const FirstQuarterContainer =
    connect(mapStateToProps, mapDispatchToProps)(FirstQuarter)

export default FirstQuarterContainer;