import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { GridContainer, GridCol } from '../Grid';
import UserVideoStream from '../UserVideoStream';
import styles from './TrainingSession.scss';
import { withRouter } from 'react-router';
import { Line } from 'rc-progress';

class TrainingSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      knnLoaded: false,
      recording: false,
      examplesCaptured: 0
    };
    this.onVideoStreamUpdated = this.onVideoStreamUpdated.bind(this);
    this.onVideoStreamError = this.onVideoStreamError.bind(this);
    this.progressReport = this.progressReport.bind(this);
  }
  onVideoStreamUpdated(imageNode) {
    const examplesCaptured = this.props.imageClassifier
      .getExamplesForClass(this.props.classId);

    if (
      this.state.knnLoaded &&
      this.state.recording &&
      examplesCaptured < this.props.examplesNeeded
    ) {
      this.props.imageClassifier.addImage(imageNode, this.props.classId);
    }
  }
  onVideoStreamError() {
    if (!this.state.cameraError) {
      this.setState({
        cameraError: true
      });
    }
  }
  // TODO: Update build system to use async/await
  componentDidMount() {
    this.props.imageClassifier.load().then(() => {
      this.setState({ knnLoaded: true });
    });
    this.progressReport();
    this.reportInterval = window.setInterval(this.progressReport, 1000);
  }
  componentWillUnmount() {
    window.clearInterval(this.reportInterval);
  }
  progressReport() {
    const examplesCaptured = this.props.imageClassifier
      .getExamplesForClass(this.props.classId);

    if (this.state.examplesCaptured >= this.props.examplesNeeded) {
      this.props.onTrainingComplete();
    }

    if (this.state.recording) {
      this.setState({
        examplesCaptured
      });
    }
  }
  render() {
    const percentage = Math.round(
      (this.state.examplesCaptured / this.props.examplesNeeded) * 100
    );

    // TODO: Conditionals for cameraError are kind of hackey. Abstract this
    // to a higher-order component
    return (
      <main>
        <GridContainer>
          <section className="train-container">
            <GridCol className="instructions">
              {this.props.instructions}
            </GridCol>
            <GridCol>
              {!this.state.cameraError && (
                <UserVideoStream
                  imageSize={this.props.dataImageSize}
                  onVideoStreamUpdated={this.onVideoStreamUpdated}
                  onVideoStreamError={this.onVideoStreamError}
                  />
              )}
              {this.state.cameraError && (
                <div style={{color: "red"}}>
                  Either your device doesn&apos;t have a camera or you haven&apos;t
                  given me permission to use it. ☹️ Please reload the page and be
                  sure to click <em>Accept</em>. The video stays on your device.
                  I don&apos;t send the data anywhere.
                </div>
              )}
            </GridCol>
            {!this.state.recording && !this.state.cameraError && (
              <Button
                style={this.props.buttonStyle}
                onClick={() => this.setState({ recording: true })}
              >
                {this.props.buttonText}
              </Button>
            )}
            {this.state.recording && (
              <div style={{ width: "100%" }}>
                <div>Training AI: {percentage}%</div>
                <Line
                  percent={percentage}
                  strokeWidth="3"
                  strokeColor="#0C6CD4"
                />
              </div>
            )}
          </section>
        </GridContainer>
      </main>
    );
  }
}

TrainingSession.defaultProps = {
  buttonStyle: {}
};

TrainingSession.propTypes = {
  onTrainingComplete: PropTypes.func.isRequired,
  examplesNeeded: PropTypes.number.isRequired,
  classId: PropTypes.string.isRequired,
  imageClassifier: PropTypes.shape({
    addClass: PropTypes.func.isRequired,
    load: PropTypes.func.isRequired
  }).isRequired,
  dataImageSize: PropTypes.number.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonStyle: PropTypes.objectOf(PropTypes.string)
};

export default TrainingSession;
