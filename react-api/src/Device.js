import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import  Delete  from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';

import axios from 'axios'
import { lightBlue } from '@material-ui/core/colors';

import "./Device.css";
import { inherits } from 'util';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
}));

var buttonStyle = {
    margin: '10px 10px 10px 3px',
    background:'#086fb42a'
  };

var deleteButtonStyle = {
    margin: '10px 10px 10px 30px',
  };



export default class Device extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            devices: []
        }

        this.handleDevices = this.handleDevices.bind(this)
        this.handleDevices()

    }

    handleDevices() {
        var storeID = sessionStorage.getItem("storeID")
        axios.get('http://localhost:9000/devices/'+ storeID)
      .then(res => {
        this.setState({
            devices: res.data.map(row => ({...row.device, doc_id: row._id}))
        })
        })
    }

    removeDevice = (id) => {
        this.setState({devices: this.state.devices.filter(function(device) {
            if ( device.deviceID != id)  return device
        })});
      }

    handleClick = () => {
        console.log('this is:', this);
    }

    handleClick2(event, id) {  // delete
        event.preventDefault();
        axios.delete('http://localhost:9000/device/' + id)
        .then(res => {
            this.removeDevice(id);
            
        console.log(this.state.devices);
            
        })        
    }

    updateDevice = (deviceID, checked) => {
        axios.put('http://localhost:9000/devices/', {deviceID, isActive: checked})

    }
    


    render() {
        const myStyle = {
            root: {
                width: '100%',
                marginTop: '30px',
                overflowX: 'auto',
            },
            table: {
                minWidth: 650,
            },
        };
        return (
            <div className="Device">
                <h3>My Devices</h3>
            <Paper className={myStyle.root}>
                <Table className={myStyle.table}>
                
                    <TableBody>
                        {this.state.devices.sort().map(row => (
                            <TableRow key={row}>
                                <div style={{ display: "flex" }}>
                                <TableCell component="tr" scope="row">
                                        {row.deviceID}

                                        <IconButton>
                                        
                                        
                                        
                                        <Checkbox 
                                        //checked = {row.isActive}
                                       // onChange = {(e) => this.updateDevice(row.doc_id, e.target.checked)}
                                        >
                                        
                                        </Checkbox>
                                        </IconButton>

                                        <IconButton
                                        size="small"
                                        style={deleteButtonStyle}
                                        onClick ={(e) => {this.handleClick2(e, row.deviceID) }}
                                         >
                                        <Delete>
                                        </Delete>
                                        
                                        </IconButton>
                                </TableCell>
                                </div>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            <Button                    
                    color={lightBlue}
                    size="medium"
                    style={buttonStyle}
                    background='#086fb42a'

                     >
                    + New device
                </Button>
            </div>
        );
    }


}

