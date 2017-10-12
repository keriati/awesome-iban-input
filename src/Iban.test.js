import React from 'react';
import Iban from './Iban';
import Enzyme, { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const PARTIAL_IBAN_WITHOUT_FORMATTING = '1234';
const IBAN_WITHOUT_FORMATTING = '123456789012345678901234';
const IBAN_WITH_FORMATTING = '1234 5678 9012 3456 7890 1234';
const TOO_LONG_IBAN = IBAN_WITHOUT_FORMATTING + '1';

const createIban = function (iban, onChange) {
    return shallow((
        <Iban iban={iban} onChange={onChange} />
    ));
};

it('renders iban', function () {
    renderer.create((
        <Iban />
    ));
});

it('displays iban prop', function () {
    const iban = createIban(PARTIAL_IBAN_WITHOUT_FORMATTING);

    expect(iban.find('input').props().value).toBe(PARTIAL_IBAN_WITHOUT_FORMATTING);
});

it('displays iban prop with space after 4 characters', function () {
    const iban = createIban(IBAN_WITHOUT_FORMATTING);

    expect(iban.find('input').props().value).toBe(IBAN_WITH_FORMATTING);
});

it('calls callback on input change', function () {
    const mockOnChange = jest.fn();
    const iban = createIban('', mockOnChange);

    iban.find('input').simulate('change', { target: { value: IBAN_WITHOUT_FORMATTING } });

    expect(mockOnChange).toBeCalled();
    expect(mockOnChange.mock.calls[0][0]).toBe(IBAN_WITHOUT_FORMATTING);
});

it('does not call callback on input change when input is too long', function () {
    const mockOnChange = jest.fn();
    const iban = createIban('', mockOnChange);

    iban.find('input').simulate('change', { target: { value: TOO_LONG_IBAN } });

    expect(mockOnChange).not.toBeCalled();
});
