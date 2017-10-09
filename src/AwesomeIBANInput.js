import React, { Component } from 'react';
import './AwesomeIBANInput.css';

const MAX_IBAN_LENGTH = 24;

class AwesomeIBANInput extends Component {
  constructor() {
    super();
    this.handleInput = this.handleInput.bind(this);
    this.state = {
      iban: ''
    };
  }

  handleInput() {
    const value = this.ibanInput.value.replace(/[\s]/g, '');

    if (value.length > MAX_IBAN_LENGTH) {
      return;
    }

    const formatedIBAN = this.formatIBAN(value);

    this.setState({iban: formatedIBAN})
  }

  formatIBAN(iban) {
    return iban.replace(/(.{4})/g, '$1 ').trim();
  }

  render() {
    return (
      <div className="AwesomeIBANInput">
        Enter your IBAN here:
        <input
        name="AwesomeIBANInput"
        onInput={this.handleInput}
        value={this.state.iban}
        ref={(input) => { this.ibanInput = input; }}
        />
      </div>
    );
  }
}

export default AwesomeIBANInput;
