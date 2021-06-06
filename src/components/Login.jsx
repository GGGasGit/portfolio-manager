import './Login.css';
import React, { Component } from 'react';

export default class Login extends Component {

    state = {
        nameInput: "",
    }

    handleInputChange = (e) => {
        const value = e.target.value;
        this.setState({
            nameInput: value,
        });
    }

    handleLoginClick = () => {
        if (this.state.nameInput) {
            this.props.handleUserLogin(this.state.nameInput);
        } else {
            alert("Username cannot be empty");
        }
    }

    handleRegisterClick = () => {
        if (this.state.nameInput) {
            this.props.handleUserRegister(this.state.nameInput);
        } else {
            alert("Username cannot be empty");
        }
    }

    handleOkClick = () => {
        this.props.getUserData();
    }

    render() {
        const errorMessage = (this.props.errorMessage) ? this.props.errorMessage : "";
        const loginContainer = this.props.loginMessage === ""
            ?   <div className="login-container">
                    <div className="login-login">
                        <label htmlFor="username" className="username-text">Username</label>
                        <input type="text" className="username-input" name="username" onChange={this.handleInputChange}></input>
                    </div>
                    <button type="button" className="login-button" onClick={this.handleLoginClick}>Login</button>
                    <div className="login-register">
                        <p className="register-text">or enter a username and click</p>
                        <button type="button" className="register-button" onClick={this.handleRegisterClick}>Register</button>
                        <p className="error-text">{errorMessage}</p>
                    </div>
                </div>
            :   <div className="login-container">
                    <div className="login-register">
                        <p className="register-text">{this.props.loginMessage}</p>
                        <button type="button" className="register-button" onClick={this.handleOkClick}>OK</button>
                    </div>
                </div>

        return (
            <div className="popup-background">
                <div className="popup-foreground login-popup-foreground">
                    <h2 className="login-title">Crypto Portfolio Manager<br/><br/>Login</h2>
                    {loginContainer}
                </div>
            </div>
        )
    }
}