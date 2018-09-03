import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { GridContainer, GridCol } from '../Grid';
import UserVideoStream from '../UserVideoStream';
import styles from './WorkoutSession.scss';

class WorkoutSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      knnLoaded: false,
      classId: null,
      confidence: 0
    };
    this.onVideoStreamUpdated = this.onVideoStreamUpdated.bind(this);
  }
  onVideoStreamUpdated(imageNode) {
    this.imageNode = imageNode;
  }
  predictionCycle() {
    if (this.imageNode) {
      const model = this.props.imageClassifier;

      model.predict(this.imageNode).then(result => {
        if (result) {
          const { classId, confidence } = result;
          this.setState({ classId, confidence });
        }
      });
    }
    setTimeout(() => {
      this.predictionCycle();
    }, this.props.predictionInterval);
  }
  componentDidMount() {
    this.props.imageClassifier.load().then(() => {
      this.setState({ knnLoaded: true });
    });
    this.predictionCycle();
  }
  render() {
    let statusNoun = '';

    // TODO: Use constant
    switch (this.state.classId) {
      case 'correctPosture':
        statusNoun = 'Okay';
      break;
      case 'incorrectPosture':
        statusNoun = 'Careful!';
      break;
    }

    return (
      <main>
        <GridContainer>
          <div className="class-prediction">
            <div className="prediction-text">{statusNoun}</div>
          </div>
          <UserVideoStream
            imageSize={this.props.dataImageSize}
            onVideoStreamUpdated={this.onVideoStreamUpdated}
          />
        </GridContainer>
      </main>
    );
  }
}

WorkoutSession.defaultProps = {
  predictionInterval: 1000
};

WorkoutSession.propTypes = {
  predictionInterval: PropTypes.number,
  dataImageSize: PropTypes.number.isRequired,
  imageClassifier: PropTypes.shape({
    addClass: PropTypes.func.isRequired,
    load: PropTypes.func.isRequired
  }).isRequired
};

export default WorkoutSession;
