import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';

import Header from './components/Header';
import ImageClassifier from './model/ImageClassifier';

const DNN_CLASS_ID_GOOD = 'correctPosture';
const DNN_CLASS_ID_BAD = 'incorrectPosture';

const DNN = new ImageClassifier();
DNN.addClass(DNN_CLASS_ID_GOOD, 'Examples of correct posture');
DNN.addClass(DNN_CLASS_ID_BAD, 'Examples of incorrect posture');

const App = () => (
  <Header title="Spotter" />
);

render(<App />, document.getElementById('root'));
