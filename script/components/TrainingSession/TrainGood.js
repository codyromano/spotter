import React from 'react';
import PropTypes from 'prop-types';
import TrainingSession from './index';

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
    buttonText="Start recording"
    buttonStyle={{backgroundColor: "#0C6CD4", color: "#fff"}}
    {...props}
  />
);

export default TrainGood;
