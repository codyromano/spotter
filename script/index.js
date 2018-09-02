import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';

import Header from './components/Header';

const App = () => (
  <Header title="Spotter" />
);

render(<App />, document.getElementById('root'));
