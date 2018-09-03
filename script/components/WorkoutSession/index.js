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
      knnLoaded: false
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
        console.log(result);
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
    return (
      <main>
        <GridContainer>
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
  predictionInterval: 2500
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
