import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Colors from '../utils/Colors';
import {StatusBar,Platform,View} from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
export default class NewStatusBar extends Component{
  static propTypes = {
    barStyle:React.PropTypes.string, //ios
    networkVisible:React.PropTypes.bool, //ios
    transition:React.PropTypes.string, //ios
    hidden:React.PropTypes.bool, //ios
    iosBgColor:React.PropTypes.string, //ios
    borderBottom:React.PropTypes.number, //ios
    androidBgColor:React.PropTypes.string, //android
    transparent:React.PropTypes.bool //android
  };

  static defaultProps = {
    barStyle:'default',
    networkVisible:false,
    transition:'fade',
    hidden:false,
    iosBgColor:Colors.bottom_black,
    borderBottom:0,
    androidBgColor:'white',
    transparent:false
  };
  constructor(props){
    super(props);
  }

  render(){
    let _platformIos = Platform.OS === 'ios';
    let {barStyle,networkVisible,transition,hidden,iosBgColor,borderBottom,androidBgColor,transparent} = this.props;
    return (
        <View style={{backgroundColor:iosBgColor,height:STATUSBAR_HEIGHT,borderBottomWidth:borderBottom, borderColor:"#ccc"}}>
          <StatusBar barStyle={barStyle} networkActivityIndicatorVisible={networkVisible}
          transition={transition} hidden={hidden} backgroundColor={androidBgColor} translucent={transparent}/>
        </View>
    )
    // return _platform == 'ios'? <StatusBar barStyle={barStyle} networkActivityIndicatorVisible={networkVisible}
    // transition={transition} hidden={hidden}/> : <StatusBar backgroundColor={bgColor} translucent={transparent}/>
  }
}
