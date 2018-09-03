import React from 'react';
import PropTypes from 'prop-types';

export default class UserVideoStream extends React.Component {
  constructor(props) {
    super(props);
    this.onVideoStreamUpdated = this.onVideoStreamUpdated.bind(this);
    this.videoDataNode = document.createElement('video');
  }
  componentDidMount() {
    this.videoNode.setAttribute('autoplay', '');
    this.videoNode.setAttribute('playsinline', '');

    // We need two streams because one must be 227 pixels for SqueezeNet
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
      .then((stream) => {
        this.videoDataNode.width = this.props.imageSize;
        this.videoDataNode.height = this.props.imageSize;
        this.videoDataNode.srcObject = stream;
      });

    navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then((stream) => {
      this.videoNode.width = this.props.imageSize;
      this.videoNode.height = this.props.imageSize;
      this.videoNode.srcObject = stream;
    });

    this.videoNode.addEventListener('playing', ()=> this.videoPlaying = true);
    this.videoNode.addEventListener('paused', ()=> this.videoPlaying = false);

    this.videoStreamUpdateCycle = window.requestAnimationFrame(
      this.onVideoStreamUpdated
    );
  }
  onVideoStreamUpdated() {
    // TODO: Debounce this method to improve performance
    if (this.videoPlaying) {
      this.props.onVideoStreamUpdated(this.videoNode);
    }
    window.requestAnimationFrame(this.onVideoStreamUpdated);
  }
  componentWillUnmount() {
    this.videoDataNode = null;
    this.videoNode = null;
    window.cancelAnimationFrame(this.videoStreamUpdateCycle);
  }
  render() {
    return (
      <video
        style={{ width: '100%', height: '100%'}}
        ref={(node) => {
          this.videoNode = node;
        }}
      />
    )
  }
}

UserVideoStream.propTypes = {
  imageSize: PropTypes.number.isRequired,
  onVideoStreamUpdated: PropTypes.func.isRequired
};
