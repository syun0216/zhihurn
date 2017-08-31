import React,{Component} from 'react';
import {View,Text,StyleSheet,Image,Dimensions,ListView} from 'react-native';
import {Header,Container,Content,Left,Body,Right,Button} from 'native-base';
import api from '../api/_index';
import FullScreenLoading from '../components/FullScreenLoading';
import CommonListView from '../components/CommonListView';
export default class DailyThemeView extends Component{
  static navigationOptions = {
    header:null,
    drawerLabel: '财经日报',
   drawerIcon: () => (
     <View>
           <Image
               source={require('../assets/finance.png')}
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
    api.getTopicsById(6).then((data) => {
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
      return (
        <Container>
          <Header style={{backgroundColor:'#242A2F'}} iosBarStyle="light-content">
            <Left>
              <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
                <Image style={styles.icon} source={require('../assets/menu.png')}/>
              </Button>
            </Left>
            <Body><Text style={{fontSize: 18,color:'white'}}>财经日报</Text></Body>
            <Right></Right>
          </Header>
          {this.state.themesData != null ? null : this._renderFullLoadingView()}
          <Content>
            {this.state.themesData != null ? <CommonListView data={this.state.themesData} navigation={this.props.navigation}/> : null}
          </Content>
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
