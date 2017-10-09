import React, { Component } from 'react';
import './AwesomeIBANInput.css';

const MAX_IBAN_LENGTH = 24;
const MAX_IBAN_LETTERS = 2;
const FLASH_DURATION = 1000;
const ALLOWED_KEYS = ['Backspace', 'Shift', 'Delete'];

class AwesomeIBANInput extends Component {
  constructor() {
    super();
    this.onInput = this.onInput.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.state = {
      iban: '',
      flash: false
    };
  }

  onInput() {
    const value = this.cleanIBANfromWhitespace(this.ibanInput.value);

    if (value.length > MAX_IBAN_LENGTH) {
      return;
    }

    const formatedIBAN = this.formatIBAN(value);

    this.setState({iban: formatedIBAN})
  }

  onKeyDown(ev) {
    const stateIBANcleaned = this.cleanIBANfromWhitespace(this.state.iban);

    if (this.isLetter(ev.key)) {
      if (stateIBANcleaned.length >= MAX_IBAN_LETTERS) {
        ev.preventDefault();
        this.setFlash();
      }
    } else if (this.isNumber(ev.key)) {
      if (stateIBANcleaned.length < MAX_IBAN_LETTERS) {
        ev.preventDefault();
        this.setFlash();
      }
    } else if (ALLOWED_KEYS.includes(ev.key)){

    } else {
      ev.preventDefault();
      this.setFlash();
    }
  }

  setFlash() {
    this.setState({flash: true});
    setTimeout(this.unsetFlash.bind(this),FLASH_DURATION);
  }

  unsetFlash() {
    this.setState({flash: false});
  }

  formatIBAN(iban) {
    return iban.replace(/(.{4})/g, '$1 ').trim();
  }

  cleanIBANfromWhitespace(iban) {
    return iban.replace(/[\s]/g, '');
  }

  isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
  }

  isNumber(number) {
    return /^[0-9]$/.test(number);
  }

  render() {
    return (
      <div className="AwesomeIBANInput">
        Enter your IBAN here:
        <input
        name="AwesomeIBANInput"
        className={this.state.flash ? 'flash' : ''}
        onInput={this.onInput}
        onKeyDown={this.onKeyDown}
        value={this.state.iban}
        ref={(input) => { this.ibanInput = input; }}
        />
      </div>
    );
  }
}

export default AwesomeIBANInput;
