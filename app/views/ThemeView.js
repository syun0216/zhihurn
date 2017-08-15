import React,{Component} from 'react';
import {View,Text,StyleSheet,Image,Dimensions,ListView} from 'react-native';
import {Header,Container,Content,Left,Body,Right,Button} from 'native-base';
import api from '../api/_index';
import FullScreenLoading from '../components/FullScreenLoading';
export default class ThemeView extends Component{
  static navigationOptions = {
    header:null,
    drawerLabel: '日常心理学',
   drawerIcon: () => (
     <View>
           <Image
               source={require('../assets/menu.png')}
               style={styles.icon}
           />
     </View>

   ),
  };

  constructor(props){
    super(props);
    this.state = {
      themeData:[],
      isHttpRequesting:false
    }
  }

  componentDidMount(){
    this._requestThemesData();
  }

  //requests
  _requestThemesData(){
    api.getTopicsById(13).then((data) => {
      if(data.data !== null && data.data.stories.length !== 0){
        this.setState({
          themesData:data.data.stories
        })
      }
    },() => {
      console.log('Api goes wrong');
    })
  }

  //views

    render(){
      return (
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
                <Image style={styles.icon} source={require('../assets/menu.png')}/>
              </Button>
            </Left>
            <Body><Text>ThemeView</Text></Body>
            <Right></Right>
          </Header>
          <Content>
            <View>
              <Text>this is the themeview!</Text>
            </View>
          </Content>
        </Container>
      )
    }

    _renderFullLoadingView(){
      return <FullScreenLoading message="正在加载中..."/>
    }

    _renderThemeMainView(){
      return (
        <FlatList

        />
      )
    }
}

const styles = StyleSheet.create({
  icon:{
    width:24,
    height:24
  }
});
