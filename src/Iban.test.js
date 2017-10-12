import React from 'react';
import Iban, { removeCharAtIndex } from './Iban';
import Enzyme, { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const PARTIAL_IBAN_WITHOUT_FORMATTING = '1234';
const IBAN_WITHOUT_FORMATTING = 'SK3456789012345678901234';
const IBAN_WITH_FORMATTING = 'SK34 5678 9012 3456 7890 1234';
const TOO_LONG_IBAN = IBAN_WITHOUT_FORMATTING + '1';
const INVALID_IBAN_WITH_TOO_MANY_LETTERS = 'SKA4 5678 9012 3456 7890 1234';
const INVALID_IBAN_WITHOUT_STARTING_LETTERS = '1234 5678 9012 3456 7890 1234';
const INITIAL_LETTERS = 'SK';
const IBAN_WITH_PREFILLED_ZEROES = 'SK0000000000000000000000';

const createIban = function (iban, onChange) {
    return shallow((
        <Iban iban={iban} onChange={onChange} />
    ));
};

const writeToInput = function (input, value) {
    input.find('input').simulate('change', { target: { value } });
};

const simulateTabKey = function (input) {
    input.find('input').simulate('keyDown', { key: 'Tab', preventDefault: function () { } });
};

const getInputValue = function (input) {
    return input.find('input').props().value;
}

it('renders iban', function () {
    renderer.create((
        <Iban />
    ));
});

it('displays iban prop', function () {
    const iban = createIban(PARTIAL_IBAN_WITHOUT_FORMATTING);

    const actual = getInputValue(iban);

    expect(actual).toBe(PARTIAL_IBAN_WITHOUT_FORMATTING);
});

it('displays iban prop with space after 4 characters', function () {
    const iban = createIban(IBAN_WITHOUT_FORMATTING);

    const actual = getInputValue(iban);

    expect(actual).toBe(IBAN_WITH_FORMATTING);
});

it('calls callback on input change', function () {
    const mockOnChange = jest.fn();
    const iban = createIban('', mockOnChange);

    writeToInput(iban, IBAN_WITHOUT_FORMATTING);

    expect(mockOnChange).toBeCalled();
    expect(mockOnChange.mock.calls[0][0]).toBe(IBAN_WITHOUT_FORMATTING);
});

it('does not call callback on input change when input is too long', function () {
    const mockOnChange = jest.fn();
    const iban = createIban('', mockOnChange);

    writeToInput(iban, TOO_LONG_IBAN);

    expect(mockOnChange).not.toBeCalled();
});

it('does not call callback on input change when input does not start with letters', function () {
    const mockOnChange = jest.fn();
    const iban = createIban('', mockOnChange);

    writeToInput(iban, INVALID_IBAN_WITHOUT_STARTING_LETTERS);

    expect(mockOnChange).not.toBeCalled();
});

it('does not call callback on input change when input starts with too many letters', function () {
    const mockOnChange = jest.fn();
    const iban = createIban('', mockOnChange);

    writeToInput(iban, INVALID_IBAN_WITH_TOO_MANY_LETTERS);

    expect(mockOnChange).not.toBeCalled();
});

it('calls callback with prefilled 0s after pressing Tab', function () {
    const mockOnChange = jest.fn();
    const iban = createIban(INITIAL_LETTERS, mockOnChange);

    simulateTabKey(iban);

    expect(mockOnChange).toBeCalled();
    expect(mockOnChange.mock.calls[0][0]).toBe(IBAN_WITH_PREFILLED_ZEROES);
});

it('does not call callback with prefilled 0s after pressing Tab if there are not initial letters', function () {
    const mockOnChange = jest.fn();
    const iban = createIban('', mockOnChange);

    simulateTabKey(iban);

    expect(mockOnChange).not.toBeCalled();
});

it('removes char at index', function () {
    const input = '1';
    const index = 0;
    const expected = '';

    const actual = removeCharAtIndex(input, index);

    expect(actual).toBe(expected);
});