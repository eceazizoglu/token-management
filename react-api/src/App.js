import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Popup from 'reactjs-popup';
import "./App.css";
import axios from 'axios';
import { MDBBtn, MDBInput, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBContainer, MDBRow } from 'mdbreact';

export default class Login extends Component {

  state = {
    redirect: false,
    popup: false,
    apiresponse: "",
    email: "",
    password: ""

  };
  constructor(props) {
    super(props);

  

  }

  handlePopUp = () => {
    this.setState({
      popup: true
    })
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      this.props.history.push('/home')
      return <Redirect to='./home' />
    }
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    var submit = this.state

    axios.post('http://localhost:9000/login', submit)
      .then(res => {
        console.log(res);
        if (res.data.status === 200) {
          sessionStorage.setItem("userID", res.data.userID)
          this.setRedirect();
        }
      })
      .catch(error => {
        if (error.response.status === 400) {
          this.handlePopUp();
        }
        else if (error.response.status === 404) {
          this.handlePopUp();
        }
      }
      )
  }


  render() {
    return (
      
      <div className="Login">
                {this.renderRedirect()}

        <h1>Client Form</h1>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" size="lg">
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" size="lg">
            <FormLabel>Password</FormLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>

          <Popup
            disabled={!this.state.popup}
              trigger={
                <Button
                  block
                  style={{ padding: 6 }}
                  size="medium"
                  disabled={!this.validateForm()}
                  type="submit"
                  className="login-button" >
                  Login
            </Button>
              } position="right center"
              >
                
              <div className="login_popup">Log in failed, please try again.</div>
            </Popup>
          
        </form>

      </div>
      

    );
  }
}