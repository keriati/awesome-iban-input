import React, { Component } from 'react';

import './IbanInput.css';

class IbanInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valid: true,
      value: ''
    };

    this.input = React.createRef();
    this.formatInput = this.formatInput.bind(this);
  }

  validateInput(input) {
    return /^$|^[A-Za-z]{1}$|^[A-Za-z]{2}[0-9]{0,22}$/.test(input);
  }

  formatInput(e) {
    const value = this.input.current.value.replace(/ /g, '');
    const valid = this.validateInput(value);
    const setValue = valid ? value.replace(/(.{1,4})/g, '$1 ').trim() : this.state.value;

    this.setState({
      valid: valid,
      value: setValue
    });
  }

  render() {
    const { valid, value } = this.state;

    return (
      <input className={valid ? '' : 'invalid'}
             type="text"
             value={value}
             maxLength="29"
             ref={this.input}
             onChange={this.formatInput}
      />
    );
  }
}

export default IbanInput;
