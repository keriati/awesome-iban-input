import React, { Component } from 'react';
import Iban from './Iban';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      iban: ''
    };

    this.onChange = this.onChange.bind(this);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Iban iban={this.state.iban} onChange={this.onChange} />
      </div>
    );
  }

  onChange(value) {
    this.setState({
      iban : value
    })
  }
}

export default App;
