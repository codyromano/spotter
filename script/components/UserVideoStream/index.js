import React from 'react';
import PropTypes from 'prop-types';

export default class UserVideoStream extends React.Component {
  constructor(props) {
    super(props);
    this.onVideoStreamUpdated = this.onVideoStreamUpdated.bind(this);
    this.videoDataNode = document.createElement('video');
  }
  componentDidMount() {
    this.videoDataNode.width = this.props.imageSize;
    this.videoDataNode.height = this.props.imageSize;

    this.videoNode.setAttribute('autoplay', '');
    this.videoNode.setAttribute('playsinline', '');

    navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then((stream) => {
      this.videoNode.srcObject = stream;
      this.videoDataNode.srcObject = stream;
    });

    this.videoNode.addEventListener('playing', ()=> this.videoPlaying = true);
    this.videoNode.addEventListener('paused', ()=> this.videoPlaying = false);

    this.videoStreamUpdateCycle = window.requestAnimationFrame(
      this.onVideoStreamUpdated
    );
  }
  onVideoStreamUpdated() {
    if (this.videoPlaying) {
      this.props.onVideoStreamUpdated(this.videoDataNode);
    }
    window.requestAnimationFrame(this.onVideoStreamUpdated);
  }
  componentWillUnmount() {
    window.cancelAnimationFrame(this.videoStreamUpdateCycle);
  }
  render() {
    return (
      <video
        style={{ width: '100%', height: '100%' }}
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
