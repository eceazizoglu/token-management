import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton';
import Popup from "reactjs-popup";


import Delete from '@material-ui/icons/Delete';
import Dialog from 'rc-dialog';

import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import "./client.css";
import axios from 'axios'
import { lightBlue, green, lightGreen } from '@material-ui/core/colors';
import { white } from 'material-ui/styles/colors';

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

const styles = {
    center: {
        marginLeft: "auto",
        marginRight: "auto"
    }
}

var buttonStyle = {
    margin: '10px 10px 10px 300px',
    background: 'white',
    center: {
        marginLeft: "auto",
        marginRight: "auto"
    },
    display: 'flex'
};

var deleteButtonStyle = {
    margin: '10px 10px 10px auto',
};




export default class Client extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            storeNames: [],
            storeIDs: [],
            redirect: false,
            showStore: true,
            address: ""
        }

        this.handleStores = this.handleStores.bind(this)
        this.handleStores()

    }


    setRedirect = () => {
        this.props.history.push('/devices')
        this.setState({
            redirect: true
        })
    }

    compare = (a, b) => {
        // Use toUpperCase() to ignore character casing
        const genreA = a.name.toUpperCase();
        const genreB = b.name.toUpperCase();

        let comparison = 0;
        if (genreA > genreB) {
            comparison = 1;
        } else
            comparison = -1;

        return comparison;
    }


    handleStores() {
        var userID = sessionStorage.getItem("userID")
        this.setState({ storeNames: [], storeIDs: [] })
        axios.get('http://localhost:9000/stores/' + userID)
            .then(res => {
                var i;
                for (i = 0; i < res.data.length; i++) {
                    var name = res.data[i].store.address
                    var ID = res.data[i].store.storeID
                    this.setState({
                        storeNames: this.state.storeNames.concat([{ "name": name, "id": ID }]),
                        storeIDs: this.state.storeIDs.concat([ID])
                    })
                }
            }
            )



    }

    handleClick(event, id) {
        event.preventDefault();
        var submit = this.state
        var button = event.target
        var storeId = event.target.value
        sessionStorage.setItem("storeID", id)
        this.setRedirect();
    }

    removeStore = (name, id) => {
        this.setState({
            storeNames: this.state.storeNames.filter(function (store) {
                if (store.id != id) return store
            })
        });
    }

    addStore = () => {
        console.log(this.state.storeIDs);
        const storeId = this.state.storeIDs.sort((a, b) => b - a)[0] + 1;
        axios.post('http://localhost:9000/stores', {
            storeID: storeId, devices: [], address: this.state.address, userID: sessionStorage.getItem("userID")
        })
            .then(this.handleStores)
    }

    handleClick2(event, name, id) {  // delete
        event.preventDefault();
        axios.delete('http://localhost:9000/stores/' + id)
            .then(res => {
                this.removeStore(name, id);
                console.log(this.state.storeNames);

            })
    }

    handleClick3(event, id) { // add new store
        event.preventDefault();


    }



    render() {
        return (
            <div className="Client">
                
                <h2>My Stores</h2>
                <Paper className={styles}>
                    <Table className={styles}>
                        <TableBody >
                            {this.state.storeNames.sort(this.compare).map(row => (
                                <TableRow key={row}>
                                    <TableCell
                                        component="tr" scope="row" size="medium" style={{ padding: 24 }}>
                                        <div style={{ display: "flex" }}>
                                            <Button
                                                size="small"
                                                value={row.id}
                                                onClick={(e) => { this.handleClick(e, row.id) }} >
                                                {row.name}
                                            </Button>
                                            <IconButton
                                                style={deleteButtonStyle}
                                                size="small"
                                                onClick={(e) => { this.handleClick2(e, row.name, row.id) }}
                                            >
                                                <Delete>

                                                </Delete>

                                            </IconButton>
                                        </div>
                                       
                                    </TableCell>


                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                <div style={{ display: "flex" }}>
                    <Popup
                                position="right"

                            trigger={<Button
                                size="medium"
                            background='#086fb42a'
                            style={buttonStyle}
                        >
                            + New Store
                </Button>}
                        position="right"
                        closeOnDocumentClick>
                        <input 
                            type="text"
                            placeholder="Store Name"
                            value={this.state.address}
                            onChange={(e) => this.setState({ address: e.target.value })} />
                            <Button onClick={(e) => (this.addStore())} >OK</Button>


                    </Popup>
                    

                </div>
            </div>
        );
    }


}