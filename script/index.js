import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import Header from './components/Header';
import ImageClassifier from './model/ImageClassifier';
import UserVideoStream from './components/UserVideoStream';
import { GridContainer } from './components/Grid';

const DNN_CLASS_ID_GOOD = 'correctPosture';
const DNN_CLASS_ID_BAD = 'incorrectPosture';
// Must be 227. Required by KNN classifier
const IMAGE_SIZE = 227;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.dnn = new ImageClassifier();
    this.state = {
      dnnLoaded: false,
      activeTrainingClass: DNN_CLASS_ID_BAD
    };
    this.onVideoStreamUpdated = this.onVideoStreamUpdated.bind(this);
  }
  onVideoStreamUpdated(imageNode) {
    if (this.state.dnnLoaded) {
      this.dnn.addImage(imageNode, this.state.activeTrainingClass);
    }
  }
  // TODO: Update build system to use async/await
  componentDidMount() {
    this.dnn.addClass(DNN_CLASS_ID_GOOD, 'Examples of correct posture');
    this.dnn.addClass(DNN_CLASS_ID_BAD, 'Examples of incorrect posture');

    this.dnn.load().then(() => {
      this.setState({ dnnLoaded: true });
    });
  }
  render() {
    return (
      <main>
        <GridContainer>
          <img src="./images/trainer.jpg" />
          <UserVideoStream
            imageSize={IMAGE_SIZE}
            onVideoStreamUpdated={this.onVideoStreamUpdated}
          />
        </GridContainer>
      </main>
    );
  }
}

render(<App />, document.getElementById('root'));
