import React from 'react';
import PropTypes from 'prop-types';
import styles from './UserVideoStream.scss';

export default class UserVideoStream extends React.Component {
  constructor(props) {
    super(props);
    this.onVideoStreamUpdated = this.onVideoStreamUpdated.bind(this);
  }
  componentDidMount() {
    this.videoNode.setAttribute('autoplay', '');
    this.videoNode.setAttribute('playsinline', '');

    navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then((stream) => {
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
    if (this.videoPlaying && this.videoNode) {
      this.videoNode.width = this.props.imageSize;
      this.videoNode.height = this.props.imageSize;
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
