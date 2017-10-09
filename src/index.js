import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AwesomeIBANInput from './AwesomeIBANInput';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AwesomeIBANInput />, document.getElementById('root'));
registerServiceWorker();
