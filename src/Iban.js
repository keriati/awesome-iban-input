import React, { Component } from 'react';

const MAX_IBAN_LENGTH = 24;

export default class Iban extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    render() {
        return (
            <input value={this.formatIban(this.props.iban)} onChange={this.onChange} style={{ width: '25em' }} />
        );
    }

    onChange(evt) {
        let value = this.parseIban(evt.target.value);
        if (value.length > MAX_IBAN_LENGTH) {
            return;
        }
        this.props.onChange(value);
    }

    formatIban(value) {
        return value && value.match(/.{1,4}/g).join(' ');
    }

    parseIban(value) {
        return value.replace(/ /g, '');
    }
}