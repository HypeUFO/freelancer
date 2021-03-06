import React, {Component} from 'react';
// import {Text, View, StyleSheet} from 'react-native';


class StopWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: null,
      started: false,
      elapsed: null,
    };
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
    this.formatTime = this.formatTime.bind(this);
    const width = props.msecs ? 220 : 150;
    this.defaultStyles = {
      container: {
        backgroundColor: '#000',
        padding: 5,
        borderRadius: 5,
        width: width,
      },
      text: {
        fontSize: 30,
        color: '#FFF',
        marginLeft: 7,
      }
    };
  }

  componentDidMount() {
    if(this.props.start) {
      this.start();
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.start) {
      this.start();
    } else {
      this.stop();
    }
    if(newProps.reset) {
      this.reset();
    }

  }

  start() {
    this.setState({startTime: this.props.startTime ? this.props.startTime :
      new Date(), started: true});
    this.interval = this.interval ? this.interval : setInterval(() => {
      this.setState({
        elapsed: new Date() - this.props.startTime
      });
    }, 1);
  }

  stop() {
    if(this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.setState({started: false});
  }

  reset() {
    this.setState({elapsed: null, startTime: null});
  }

  formatTime() {
    let now = this.state.elapsed;
    let msecs = now % 1000;

    if(msecs < 10) {
      msecs = `00${msecs}`;
    } else if(msecs < 100) {
      msecs = `0${msecs}`;
    }

    let seconds = Math.floor(now / 1000);
    let minutes = Math.floor(now / 60000);
    let hours = Math.floor(now / 3600000);
    seconds -= (minutes * 60);
    minutes -= (hours * 60);
    let formatted;
    if(this.props.msecs) {
      formatted = `${hours < 10 ? 0 : ""}${hours}:${minutes < 10 ?
        0 : ""}${minutes}:${seconds < 10 ?
          0 : ""}${seconds}:${msecs}`;
    } else {
      formatted = `${hours < 10 ? 0 : ""}${hours}:${minutes < 10 ?
        0 : ""}${minutes}:${seconds < 10 ? 0 : ""}${seconds}`;
    }
    return formatted;
  }


  render() {

    const styles = this.props.options ? this.props.options : this.defaultStyles;

    return(
      <div style={styles.container}>
        {this.formatTime()}
      </div>
    );
  }
}

export default StopWatch;