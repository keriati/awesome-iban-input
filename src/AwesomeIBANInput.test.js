import React from 'react';
import ReactDOM from 'react-dom';
import AwesomeIBANInput from './AwesomeIBANInput';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AwesomeIBANInput />, div);
});
