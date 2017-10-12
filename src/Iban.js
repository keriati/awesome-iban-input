import React, { Component } from 'react';

const WARNING_DURATION = 1000;
const IBAN_LENGTH = 24;
const INITIAL_LETTER_COUNT = 2;

export function removeCharAtIndex(value, index) {
    const start = value.substr(0, index);
    const end = value.substr(index + 1);
    return  start + end;
}

export default class Iban extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayWarning: false,
            prefilledZeroesStart: IBAN_LENGTH
        };

        this.onChange = this.onChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    render() {
        const borderColor = this.state.displayWarning ? 'red' : 'black';
        return (
            <input
                value={this.formatIban(this.props.iban)}
                onKeyDown={this.onKeyDown}
                onChange={this.onChange}
                style={{ width: '25em', borderColor: borderColor }}
            />
        );
    }

    onChange(evt) {
        let value = this.parseIban(evt.target.value);
        if (this.shouldRemoveZero(value, this.state.prefilledZeroesStart)) {
            value = removeCharAtIndex(value, this.state.prefilledZeroesStart);
        }
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

    onKeyDown(evt) {
        if (evt.key === 'Tab') {
            evt.preventDefault();
            this.prefillZeroes();
        }
    }

    prefillZeroes() {
        const value = this.props.iban;
        if (!this.canPrefillZeroes(value)) {
            return;
        }
        const zeroCount = IBAN_LENGTH - value.length;
        const zeroesToPrefill = Array(zeroCount + 1).join('0');
        this.setState({
            prefilledZeroesStart: value.length
        });
        this.props.onChange(value + zeroesToPrefill);
    }

    canPrefillZeroes(value) {
        return value.length >= INITIAL_LETTER_COUNT;
    }

    shouldRemoveZero(value, prefilledZeroesStart) {
        const isTooLong = value.length === IBAN_LENGTH + 1;
        const hasPrefilledZero = value.substr(prefilledZeroesStart, 1) === '0';
        return isTooLong && hasPrefilledZero;
    }
}