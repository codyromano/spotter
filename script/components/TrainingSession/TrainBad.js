import React from 'react';
import PropTypes from 'prop-types';
import TrainingSession from './index';

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
    buttonText="Start recording"
    buttonStyle={{backgroundColor: "#EC2434", color: "#fff"}}
    {...props}
  />
);

export default TrainBad;
