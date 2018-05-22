import React, { Component } from 'react';

class IbanInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.input = React.createRef();
    this.formatInput = this.formatInput.bind(this);
  }

  formatInput(e) {
    const value = this.input.current.value.replace(/ /g, '');
    this.setState({
      value: value.replace(/(.{1,4})/g, '$1 ').trim()
    });
  }

  render() {
    const { value } = this.state;

    return (
      <input type="text"
             value={value}
             maxLength="29"
             ref={this.input}
             onChange={this.formatInput}
      />
    );
  }
}

export default IbanInput;
