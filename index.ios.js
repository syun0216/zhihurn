/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import DashBoardView from './app/DashBoardView';
import OpeningView from './app/OpeningView';

// export default class zhihurn extends Component {
//   render() {
//     return (
//         <OpeningView/>
//     );
//   }
// }

let zhihurn = DashBoardView;
AppRegistry.registerComponent('zhihurn', () => zhihurn);
