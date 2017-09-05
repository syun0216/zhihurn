import React,{Component} from 'react';
import {View,Text,StyleSheet,Image,Dimensions,ListView} from 'react-native';
import {Header,Container,Content,Left,Body,Right,Button} from 'native-base';
import api from '../api/_index';
import FullScreenLoading from '../components/FullScreenLoading';
import CommonListView from '../components/CommonListView';
import CommonHeaderView from '../components/CommonHeaderView';
export default class DailyThemeView extends Component{
  static navigationOptions = {
    header:null,
    drawerLabel: '动漫日报',
   drawerIcon: () => (
     <View>
           <Image
               source={require('../assets/comic.png')}
               style={styles.icon}
           />
     </View>

   ),
  };

  constructor(props){
    super(props);
    this.state = {
      themeData:null,
      isHttpRequesting:false
    }
  }

  componentDidMount(){
    this.setState({
      isHttpRequesting:true
    });
    this._requestThemesData();
  }

  //requests
  _requestThemesData(){
    api.getTopicsById(9).then((data) => {
      if(data.data !== null && data.data.stories.length !== 0){
        for(let item of data.data.stories){
          if(typeof item.images === 'undefined'){
            item.images = null;
          }
        }
        this.setState({
          themesData:data.data,
          isHttpRequesting:false
        })
      }
  })
}

  //views

    render(){
      let _statusBarSetting = {
          networkVisible:this.state.isHttpRequesting,
          iosBgColor:'transparent',
          iosHeight:0,
          barStyle:'light-content'
      };
      return (
        <Container>
          <CommonHeaderView statusBarSetting={_statusBarSetting} headerName="动漫日报" navigation={this.props.navigation}/>
          {this.state.themesData != null ? null : this._renderFullLoadingView()}
            {this.state.themesData != null ? <CommonListView style={{marginTop:50}} data={this.state.themesData} navigation={this.props.navigation}/> : null}
        </Container>
      )
    }

    _renderFullLoadingView(){
      return <FullScreenLoading message="正在加载中..."/>
    }
}

const styles = StyleSheet.create({
  icon:{
    width:24,
    height:24
  }
});
