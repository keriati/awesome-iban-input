import React from 'react';
import ReactDOM from 'react-dom';
import AwesomeIBANInput from './AwesomeIBANInput';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AwesomeIBANInput />, div);
});

describe('IBAN formating',() => {
  it('formats IBAN correctly for full IBAN', () => {
    const myIBAN = 'SK1012341234123412341234';
    const awesomeIBANInput =  new AwesomeIBANInput();
    expect(awesomeIBANInput.formatIBAN(myIBAN)).toBe('SK10 1234 1234 1234 1234 1234');
  });

  it('formats IBAN correctly for part IBAN', () => {
    const myIBAN = 'SK1012341';
    const awesomeIBANInput =  new AwesomeIBANInput();
    expect(awesomeIBANInput.formatIBAN(myIBAN)).toBe('SK10 1234 1');
  });

  it('formats IBAN correctly for small part IBAN (no change)', () => {
    const myIBAN = 'SK1';
    const awesomeIBANInput =  new AwesomeIBANInput();
    expect(awesomeIBANInput.formatIBAN(myIBAN)).toBe('SK1');
  });

  it('cleans IBAN correctly for full IBAN', () => {
    const myIBAN = 'SK10 1234 1234 1234 1234 1234';
    const awesomeIBANInput =  new AwesomeIBANInput();
    expect(awesomeIBANInput.cleanIBANfromWhitespace(myIBAN)).toBe('SK1012341234123412341234');
  });

  it('cleans IBAN correctly for part IBAN', () => {
    const myIBAN = 'SK10 1234 1';
    const awesomeIBANInput =  new AwesomeIBANInput();
    expect(awesomeIBANInput.cleanIBANfromWhitespace(myIBAN)).toBe('SK1012341');
  });

  it('cleans IBAN correctly for small part IBAN (no change)', () => {
    const myIBAN = 'SK1';
    const awesomeIBANInput =  new AwesomeIBANInput();
    expect(awesomeIBANInput.cleanIBANfromWhitespace(myIBAN)).toBe('SK1');
  });
});

describe('number and letter testing', () => {
  it('tests letter correctly', () => {
    const awesomeIBANInput =  new AwesomeIBANInput();
    expect(awesomeIBANInput.isLetter('K')).toBe(true);
    expect(awesomeIBANInput.isLetter('L')).toBe(true);
    expect(awesomeIBANInput.isLetter('A')).toBe(true);
    expect(awesomeIBANInput.isLetter('B')).toBe(true);
    expect(awesomeIBANInput.isLetter('1')).toBe(false);
    expect(awesomeIBANInput.isLetter('9')).toBe(false);
    expect(awesomeIBANInput.isLetter('Tab')).toBe(false);
  });
  it('tests numbers correctly', () => {
    const awesomeIBANInput =  new AwesomeIBANInput();
    expect(awesomeIBANInput.isNumber('K')).toBe(false);
    expect(awesomeIBANInput.isNumber('L')).toBe(false);
    expect(awesomeIBANInput.isNumber('A')).toBe(false);
    expect(awesomeIBANInput.isNumber('B')).toBe(false);
    expect(awesomeIBANInput.isNumber('1')).toBe(true);
    expect(awesomeIBANInput.isNumber('9')).toBe(true);
    expect(awesomeIBANInput.isNumber('Tab')).toBe(false);
  });
});

describe('string manipulation functions',() => {
  it('removes character from string',() => {
    const awesomeIBANInput =  new AwesomeIBANInput();
    expect(awesomeIBANInput.removeCharacterOnIndex('SK123',3)).toBe('SK23');
  });
  it('adds character to string',() => {
    const awesomeIBANInput =  new AwesomeIBANInput();
    expect(awesomeIBANInput.addCharacterOnIndex('SK123',3,'0')).toBe('SK1023');
  });
});
