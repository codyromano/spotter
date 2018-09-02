import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { TrainerDialogue, IntroPage, PrivacyNotice, TrainBadDone, TrainGoodDone } from './components/TrainerDialogue';
import TrainingSession from './components/TrainingSession';
import ImageClassifier from './model/ImageClassifier';
import * as routes from './routes';

const knn = new ImageClassifier();
const KNN_CLASS_ID_GOOD = 'correctPosture';
const KNN_CLASS_ID_BAD = 'incorrectPosture';
const IMAGE_SIZE = 227;
const EXAMPLES_PER_SESSION = 250;

knn.addClass(KNN_CLASS_ID_GOOD, 'Examples of correct posture');
knn.addClass(KNN_CLASS_ID_BAD, 'Examples of incorrect posture');

const TrainBad = (props) => (
  <TrainingSession
    imageClassifier={knn}
    instructions={
      <p>Show me examples of <strong>bad</strong> posture for a
        specific exercise.</p>
    }
    onTrainingComplete={() => {
      window.location.href = `#${routes.TRAIN_BAD_DONE}`;
    }}
    dataImageSize={IMAGE_SIZE}
    classId={KNN_CLASS_ID_BAD}
    examplesNeeded={EXAMPLES_PER_SESSION}
    buttonText="Demonstrate bad form"
    buttonStyle={{backgroundColor: "#EC2434", color: "#fff"}}
    {...props}
  />
);

const TrainGood = (props) => (
  <TrainingSession
    imageClassifier={knn}
    instructions={
      <p>Show me examples of <strong>good</strong> posture for a
        specific exercise.</p>
    }
    onTrainingComplete={() => {
      window.location.href = `#${routes.TRAIN_GOOD_DONE}`;
    }}
    dataImageSize={IMAGE_SIZE}
    classId={KNN_CLASS_ID_GOOD}
    examplesNeeded={EXAMPLES_PER_SESSION}
    buttonText="Demonstrate good form"
    buttonStyle={{backgroundColor: "#0C6CD4", color: "#fff"}}
    {...props}
  />
);

const App = () => (
  <HashRouter>
    <Switch>
      <Route
        path={routes.TRAIN_BAD}
        exact={true}
        component={TrainBad}
      />
      <Route
        path={routes.TRAIN_BAD_DONE}
        exact={true}
        component={TrainBadDone}
      />
      <Route
        path={routes.TRAIN_GOOD_DONE}
        exact={true}
        component={TrainGoodDone}
      />
      <Route
        path={routes.TRAIN_GOOD}
        exact={true}
        component={TrainGood}
      />
      <Route
        path={routes.PRIVACY}
        exact={true}
        component={PrivacyNotice}
      />
      <Route path="/" component={IntroPage} />
    </Switch>
  </HashRouter>
);

render(<App />, document.getElementById('root'));
