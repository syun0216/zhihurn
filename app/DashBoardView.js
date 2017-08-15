import React, {Component} from 'react';
import {View, StyleSheet,ScrollView, StatusBar, Image, Platform, Dimensions, ListView} from 'react-native';
import {Container, Header, Content, Button, Icon, Text,ListItem, Left, Body, Right, Thumbnail,} from 'native-base';
import {StackNavigator, TabNavigator,DrawerNavigator,DrawerItems} from 'react-navigation';
import Swiper from 'react-native-swiper';
import FullScreenLoading from './components/FullScreenLoading';
import api from './api/_index';
import ThemeView from './views/ThemeView';
import ContentView from './views/ContentView';
import OpeningView from './OpeningView';

class DashBoardView extends Component {
    static navigationOptions = {
      header:null,
      drawerLabel: '主页',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('./assets/menu.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
    };
    _winWidth = Dimensions.get('window').width;

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            newsData: [],
            themesData:[],
            isHttpRequesting: false,
            newsList: ds.cloneWithRows([])
        }
    }

    componentDidMount() {
        this.setState({
            isHttpRequesting: true
        });
        this._requestNewsData();
        this._requestThemesData();
    }

//requests
    _requestNewsData() {
        api.getNews().then((data) => {
          if(data.data != null){
            data.data.date = data.data.date.substring(0,4)+"/"+data.data.date.substring(4,6)+"/"+data.data.date.substring(6, 8);
            data.data.weekday = this.setWeekDay(data.data.date);
            data.data.date.substring(6,8);
            let _data = [];
            _data.push(data.data);
            this.setState({
                newsData: _data,
                isHttpRequesting: false,
                newsList:this.state.newsList.cloneWithRows(_data[0].stories)
            });
            console.log(this.state.newsData);
          }
        }).catch((error) => {
            this.setState({
                isHttpRequesting: false,
            });
            console.log("Api call error");
        });
    }

    _requestThemesData(){
      api.getTopics().then((data) => {
        if(data.data != null && data.data.others.length > 0){
        this.setState({
          themesData:data.data.others
        });
        console.log(this.state.themesData);
        }
      })
    }

//common functions
  setWeekDay(date){
    let _day = new Date(date).getDay();
    switch(_day){
      case 0 :return "星期日";break;
      case 1 :return "星期一";break;
      case 2 :return "星期二";break;
      case 3 :return "星期三";break;
      case 4 :return "星期四";break;
      case 5 :return "星期五";break;
      case 6 :return "星期六";break;
    }
  }

//views
    render() {
        return (
            <Container>
              <Header>
                <Left>
                  <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen',{id:1})}>
                    <Image style={{width:24,height:24}} source={require('./assets/menu.png')} />
                  </Button>
                </Left>
                <Body><Text style={{fontSize:16}}>今日热闻</Text></Body>
                <Right></Right>
              </Header>
              {this.state.isHttpRequesting ? this._renderLoadingView() : null}
              <Content>
                {this.state.newsData.length === 0 ? null : this._renderNewsListView()}
              </Content>
            </Container>
        );
    }

    _renderLoadingView() {
        return <FullScreenLoading message="正在加载中..."/>
    }

    _renderNewsListView() {

        return <ListView
            initialListSize={10}
            pageSize={10}
            dataSource={this.state.newsList}
            renderSectionHeader={(sectionData,sectionID) => this._renderSectionHeader(sectionData,sectionID)}
            renderRow={(rowData) => this._renderNewsItem(rowData)}
            renderHeader={() => this._swiperView()}
            // renderSeparator={(sectionID, rowID) => this._renderListSeparator(sectionID, rowID)}
        />
    }

    _renderNewsItem(rowData){
        return (
            <ListItem  style={{paddingTop:10,paddingBottom:10}}
                      onPress={()=>this.props.navigation.navigate('Content',{id:rowData.id,title:rowData.title})}>
                <Left>
                    <Thumbnail square size={50} source={{ uri: rowData.images[0] }} />
                    <Text style={{borderWidth:0}}>{rowData.title.split("").length > 18 ? rowData.title.substr(0,18) + '...' : rowData.title}</Text>
                </Left>
                {/* <Body><Text>123</Text></Body> */}
                <Right></Right>
            </ListItem>
        )
    }

    _renderOpenDrawButton(){
      return (
        <Button style={{position:'absolute',top:10,left:10,zIndex:999}} transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
          <Image style={{width:24,height:24}} source={require('./assets/menu.png')} />
        </Button>
      )
    }

    _swiperView() {
        return (
            <Swiper height={200} autoplay={true} showsButtons={false} showsPagination={false}
                // style={{marginTop: -20}} dotStyle={{marginTop: -40}} activeDotStyle={{marginTop: -40}}>
            >
                {this.state.newsData[0].top_stories.map((item, index) => {
                    return (
                      <Button transparent style={styles.slide1} key={`${index}`}  onPress={() => this.props.navigation.navigate('Content',{id:item.id,title:item.title})}>
                        <View>
                            <Image style={{width: this._winWidth, height: 200}} source={{uri: `${item.image}`}}/>
                            <View style={[styles.slide1_text,{width:this._winWidth,height:50,display:'flex',justifyContent:'center',alignItems:'center'}]}><Text style={{color:'white'}}>{item.title}</Text></View>
                        </View>
                      </Button>
                    )
                })}
            </Swiper>
        )
    }

    _renderListSeparator(sectionID,rowID){
        return (
            <View key={`${sectionID}-${rowID}`}
                  style={{height: 1,
                      backgroundColor: '#ccc',}}/>
        );
    }

    _renderSectionHeader(sectionData,sectionID) {
      console.log(sectionData)
        return (
            <View style={{width:this._winWidth,height:30,backgroundColor:'#1296db'}}>
                <Text style={{color:'#fff',textAlign:'center',marginTop:5}}>{this.state.newsData[0].date}  {this.state.newsData[0].weekday}</Text>
            </View>
        )
    }
}
 let mainView = StackNavigator({
   Home: {screen: OpeningView},
   Dash:{screen:DashBoardView},
   Content: {screen: ContentView}
 });

const DashDrawerPage = DrawerNavigator({
    Home: {
        screen: mainView,
    },
    Theme: {
         screen: ThemeView,
    },
    Theme1: {
         screen: ThemeView,
    },
},{
    drawerWidth: 200, // 抽屉宽
    drawerPosition: 'left', // 抽屉在左边还是右边
    // contentComponent: CustomDrawerContentComponent,  // 自定义抽屉组件
    contentOptions: {
      initialRouteName: 'Home', // 默认页面组件
      activeItemKey : 'Theme',
      labelStyle : {//标签样式
           // color : 'red',
           height : 20,
      },
      activeTintColor: 'white',  // 选中文字颜色
      activeBackgroundColor: '#1296db', // 选中背景颜色
      inactiveTintColor: '#666',  // 未选中文字颜色
      inactiveBackgroundColor: '#fff', // 未选中背景颜色
      style: {  // 样式
         marginVertical: 0,
      },
      //没有作用
      // onItemPress : (route) => {
      // 	 console.log('-------->' + JSON.stringify(route))
      // },

   },

   contentComponent: props => {
        // console.log('contentComponent');
        // console.log(props);
        return (
            <ScrollView>
                <View>
                    <View style={{paddingVertical: 20, paddingHorizontal: 15, backgroundColor:'#000'}}>
                        <Text style={{color:'#FFF'}}>菜单</Text>
                    </View>
                    <DrawerItems {...props} />
                </View>
            </ScrollView>
        )
    },
});

module.exports = DashDrawerPage;

const styles = StyleSheet.create({
    iosSwiper: {
        marginTop: -20,

    },
    isIosDot: {
        marginTop: -30,
    },
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        position:'relative',
        alignItems: 'center',
        // backgroundColor: '#9DD6EB',
        height: 200,
    },
    slide1_img: {
        width: 100,
        backgroundColor: '#9DD6EB',
        height: 200
    },
    slide1_text:{
        position:'absolute',
        bottom:0,
        backgroundColor:'linear-gradient(180deg,transparent,rgba(0,0,0,.7))'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    icon:{
      width:24,
      height:24
    }
});
