import React, { Component } from 'react';

const WARNING_DURATION = 1000;

export default class Iban extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayWarning: false
        };

        this.onChange = this.onChange.bind(this);
    }

    render() {
        const borderColor = this.state.displayWarning ? 'red' : 'black';
        return (
            <input
                value={this.formatIban(this.props.iban)}
                onChange={this.onChange}
                style={{ width: '25em', borderColor: borderColor }}
            />
        );
    }

    onChange(evt) {
        const value = this.parseIban(evt.target.value);
        if (!this.matchesIbanFormat(value)) {
            this.displayWarning();
            return;
        }
        this.cancelWarning();
        this.props.onChange(value);
    }

    formatIban(value) {
        return value && value.match(/.{1,4}/g).join(' ');
    }

    parseIban(value) {
        return value.replace(/ /g, '');
    }

    matchesIbanFormat(value) {
        return value.match(/^[a-zA-Z]{0,2}$/) || value.match(/^[a-zA-Z]{2}\d{0,22}$/);
    }

    displayWarning() {
        this.setState({
            displayWarning: true
        });
        this.warningTimeout && clearTimeout(this.warningTimeout);
        this.warningTimeout = setTimeout(() => {
            this.setState({
                displayWarning: false
            });
        }, WARNING_DURATION);
    }

    cancelWarning() {
        this.setState({
            displayWarning: false
        });
    }
}