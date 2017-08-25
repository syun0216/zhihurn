import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {StatusBar,Platform,View} from 'react-native';

export default class NewStatusBar extends Component{
  static propTypes = {
    barStyle:React.PropTypes.string, //ios
    networkVisible:React.PropTypes.bool, //ios
    transition:React.PropTypes.string, //ios
    hidden:React.PropTypes.bool, //ios
    iosBgColor:React.PropTypes.string, //ios
    androidBgColor:React.PropTypes.string, //android
    transparent:React.PropTypes.bool //android
  };

  static defaultProps = {
    barStyle:'default',
    networkVisible:false,
    transition:'fade',
    hidden:false,
    iosBgColor:'transparent',
    androidBgColor:'white',
    transparent:false
  };
  constructor(props){
    super(props);
  }

  render(){
    let _platformIos = Platform.OS === 'ios';
    let {barStyle,networkVisible,transition,hidden,iosBgColor,androidBgColor,transparent} = this.props;
    return (
        <StatusBar barStyle={barStyle} networkActivityIndicatorVisible={networkVisible}
        transition={transition} hidden={hidden} backgroundColor={androidBgColor} translucent={transparent}/>
    )
    // return _platform == 'ios'? <StatusBar barStyle={barStyle} networkActivityIndicatorVisible={networkVisible}
    // transition={transition} hidden={hidden}/> : <StatusBar backgroundColor={bgColor} translucent={transparent}/>
  }
}
