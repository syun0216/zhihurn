import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    StatusBar,
    Image,
    Platform,
    Dimensions,
    ListView,
    TouchableOpacity
} from 'react-native';
import {FontAwesome} from 'react-native-vector-icons/FontAwesome';
import {
    Container,
    Header,
    Content,
    Button,
    Icon,
    Text,
    ListItem,
    Left,
    Body,
    Right,
    Thumbnail,
    Toast,
    Root
} from 'native-base';
import {StackNavigator, TabNavigator, DrawerNavigator, DrawerItems} from 'react-navigation';
import Swiper from 'react-native-swiper';
import FullScreenLoading from './components/FullScreenLoading';
import NewStatusBar from './components/NewStatusBar';
import ErrorView from './components/ErrorView';
import api from './api/_index';

import DailyThemeView from './views/DailyThemeView';
import RecommendThemeView from './views/RecommendThemeView';
import MovieThemeView from './views/MovieThemeView';
import BoringThemeView from './views/BoringThemeView';
import DesignThemeView from './views/DesignThemeView';
import CompanyThemeView from './views/CompanyThemeView';
import FinanceThemeView from './views/FinanceThemeView';
import InternetThemeView from './views/InternetThemeView';
import GameThemeView from './views/GameThemeView';
import MusicThemeView from './views/MusicThemeView';
import ComicThemeView from './views/ComicThemeView';
import PEThemeView from './views/PEThemeView';
import ContentView from './views/ContentView';
import CommentView from './views/CommentView';
import OpeningView from './OpeningView';

import ToastUtil from './utils/ToastUtil';
import FooterUtil from './utils/FooterUtil';

const LOADING = 0;
const LOAD_SUCCESS = 1;
const LOAD_FAILED = 2;

let day_count = 1;
let list_data = [];
const _winWidth = Dimensions.get('window').width;
const _winHeight = Dimensions.get('window').height;

class DashBoardView extends Component {
    _scrollView = null;
    static navigationOptions = {
        header: null,
        drawerLabel: '主页',
        drawerIcon: ({tintColor}) => (
            // <FontAwesome name="home" style={[styels.icon,{tintColor:tin}]}/>
            <Image
                source={require('./assets/homebig.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />

        ),
    };


    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            newsData: [],
            themesData: [],
            isHttpRequesting: false,
            newsList: ds.cloneWithRows([]),
            requestStatus: null
        }
    }

    componentDidMount() {
        this.setState({
            isHttpRequesting: true
        });
        this._requestNewsData();
    }

//requests
    _requestNewsData() {
        api.getNews().then((data) => {
            if (data.data != null) {
                data.data.date = data.data.date.substring(0, 4) + "/" + data.data.date.substring(4, 6) + "/" + data.data.date.substring(6, 8);
                data.data.weekday = this.setWeekDay(data.data.date);
                data.data.date.substring(6, 8);
                let _data = [];
                _data.push(data.data);
                list_data = _data[0].stories;
                this.setState({
                    newsData: _data,
                    isHttpRequesting: false,
                    newsList: this.state.newsList.cloneWithRows(_data[0].stories),
                });
                console.log(data.data);
                ToastUtil.show('加载成功', 1000, 'bottom');
                // console.log(this.state.newsData);
            }
        }).catch((error) => {
            this.setState({
                isHttpRequesting: false,
            });
            ToastUtil.show('加载失败', 1000, 'bottom', 'danger');
            console.log("Api call error");
        });
    }

    // _requestThemesData(){
    //   api.getTopics().then((data) => {
    //     if(data.data != null && data.data.others.length > 0){
    //     this.setState({
    //       themesData:data.data.others
    //     });
    //     // console.log(this.state.themesData);
    //     }
    //   })
    // }

    // _requestNextNewsData(){
    //   this.setState({requestStatus:LOADING});
    //   api.getNewsByDate(this.getDate(day_count)).then((data) => {
    //     if(data.data !== null && data.data.stories.length !== 0){
    //       // list_data.push(data.data.stories);
    //       list_data.concat(data.data.stories);
    //       this.setState({
    //           // newsData: this.state.newsData.push(data.data),
    //           requestStatus:LOAD_SUCCESS,
    //           // newsList:this.state.newsList.cloneWithRows(list_data),
    //       });
    //     }
    //     console.log(data);
    //   }).catch((error) => {
    //     this.setState({
    //       requestStatus:LOAD_FAILED
    //     });
    //     console.log("Api goes wrong");
    //   })
    // }


//common functions
    setWeekDay(date) {
        let _day = new Date(date).getDay();
        switch (_day) {
            case 0 :
                return "星期日";
                break;
            case 1 :
                return "星期一";
                break;
            case 2 :
                return "星期二";
                break;
            case 3 :
                return "星期三";
                break;
            case 4 :
                return "星期四";
                break;
            case 5 :
                return "星期五";
                break;
            case 6 :
                return "星期六";
                break;
        }
    }

    getDate(count) {
        let _date = new Date();
        _date.setDate(_date.getDate() + 1 - count);
        let _year = _date.getFullYear();
        let _month = (_date.getMonth() + 1) < 10 ? "0" + (_date.getMonth() + 1) : _date.getDate() + 1;
        let _day = (_date.getDate() + 1) < 10 ? "0" + (_date.getDate() + 1) : _date.getDate() + 1;
        return [_year, _month, _day].join("");
    }


//views
    render() {
        return (
            <Container>
                <NewStatusBar networkVisible={this.state.isHttpRequesting}/>
                <Header style={{backgroundColor:'#1296db'}} iosBarStyle="light-content">
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen', {id: 1})}>
                            <Image style={{width: 24, height: 24}} source={require('./assets/menu.png')}/>
                        </Button>
                    </Left>
                    <Body><Text style={{fontSize: 18,color:'white'}}>今日热闻</Text></Body>
                    <Right>
                        {/*<TouchableOpacity onPress={() => {*/}
                            {/*this._scrollView.scrollTo({y: 0, animated: false});*/}
                        {/*}}><View><Text>scroll to top</Text></View></TouchableOpacity>*/}
                    </Right>
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

    _renderErrorView(){
        return <ErrorView retry={() => this._requestNewsData()}/>
    }

    _renderNewsListView() {

        return <ListView
            ref={(scrollView) => {
                this._scrollView = scrollView;
            }}
            initialListSize={10}
            pageSize={10}
            dataSource={this.state.newsList}
            renderSectionHeader={(sectionData, sectionID) => this._renderSectionHeader(sectionData, sectionID)}
            renderRow={(rowData) => this._renderNewsItem(rowData)}
            renderHeader={() => this._swiperView()}
            renderFooter={() => this._renderFooter()}
            // onEndReached={() => this._requestNextNewsData()}
            // onEndReachedThreshold={10}
            // scrollRenderAheadDistance={50}
            // renderSeparator={(sectionID, rowID) => this._renderListSeparator(sectionID, rowID)}
        />
    }


    _renderNewsItem(rowData) {
        return (
            <ListItem style={{paddingTop: 10, paddingBottom: 10}}
                      onPress={() => this.props.navigation.navigate('Content', {id: rowData.id, title: rowData.title})}>
                <Left>
                    <Thumbnail square size={50} source={{uri: rowData.images[0]}}/>
                    <Text
                        style={{borderWidth: 0}}>{rowData.title.split("").length > 18 ? rowData.title.substr(0, 18) + '...' : rowData.title}</Text>
                </Left>
                {/* <Body><Text>123</Text></Body> */}
                <Right></Right>
            </ListItem>
        )
    }

    _renderOpenDrawButton() {
        return (
            <Button style={{position: 'absolute', top: 10, left: 10, zIndex: 999}} transparent
                    onPress={() => this.props.navigation.navigate('DrawerOpen')}>
                <Image style={{width: 24, height: 24}} source={require('./assets/menu.png')}/>
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
                        <Button transparent style={styles.slide1} key={`${index}`}
                                onPress={() => this.props.navigation.navigate('Content', {
                                    id: item.id,
                                    title: item.title
                                })}>
                            <View>
                                <Image style={{width: _winWidth, height: 200}} source={{uri: `${item.image}`}}/>
                                <View style={[styles.slide1_text, {
                                    width: _winWidth,
                                    height: 50,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }]}><Text style={{color: 'white'}}>{item.title}</Text></View>
                            </View>
                        </Button>
                    )
                })}
            </Swiper>
        )
    }

    _renderListSeparator(sectionID, rowID) {
        return (
            <View key={`${sectionID}-${rowID}`}
                  style={{
                      height: 1,
                      backgroundColor: '#ccc',
                  }}/>
        );
    }

    _renderSectionHeader(sectionData, sectionID) {
        return (
            <View style={{width: this._winWidth, height: 30, backgroundColor: '#1296db'}}>
                <Text style={{
                    color: '#fff',
                    textAlign: 'center',
                    marginTop: 5
                }}>{this.state.newsData[0].date} {this.state.newsData[0].weekday}</Text>
            </View>
        )
    }

    _renderFooter() {
        // return <FooterUtil isLoading={true} message="正在加载中..." />;
        switch (this.state.requestStatus) {
            case LOADING:
                return <FooterUtil isLoading={true} message="正在加载中..."/>;
                break;
            case LOAD_SUCCESS:
                return null;
            case LOAD_FAILED:
                return <FooterUtil message="加载失败,请点击重试" callback={() => this._requestNextNewsData()}/>;
                break;
            default:
                return null;
                break;
        }
    }
}



const DashDrawerPage = DrawerNavigator({
    Home: {
        screen: DashBoardView,
    },
    Comic: {
        screen: ComicThemeView
    },
    Music: {
        screen: MusicThemeView
    },
    Game: {
        screen: GameThemeView
    },
    Movie: {
        screen: MovieThemeView
    },
    Recommeng: {
        screen: RecommendThemeView
    },
    Theme: {
        screen: DailyThemeView,
    },
    Boring: {
        screen: BoringThemeView
    },
    Design: {
        screen: DesignThemeView
    },
    Company: {
        screen: CompanyThemeView
    },
    Finance: {
        screen: FinanceThemeView
    },
    Internet: {
        screen: InternetThemeView
    },
    PE: {
        screen: PEThemeView
    }
}, {
    drawerWidth: 200, // 抽屉宽
    drawerPosition: 'left', // 抽屉在左边还是右边
    // cardStack: {gesturesEnabled: false,},
    // contentComponent: CustomDrawerContentComponent,  // 自定义抽屉组件
    contentOptions: {
        initialRouteName: 'Home', // 默认页面组件
        activeItemKey: 'Theme',
        labelStyle: {//标签样式
            // color : 'red',
            height: 20,
        },
        activeTintColor: 'white',  // 选中文字颜色
        activeBackgroundColor: '#1D2328', // 选中背景颜色
        inactiveTintColor: '#95999D',  // 未选中文字颜色
        inactiveBackgroundColor: '#242A2F', // 未选中背景颜色
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
            <View style={{flex: 1, backgroundColor: '#242A2F'}}>
                <View style={{height: 110,marginTop:40}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 1,marginLeft:16,justifyContent:'center'}}>
                            <Image style={{width:48,height:48}} source={require('./assets/panda.png')}/>
                        </View>
                        <View style={{flex: 1,justifyContent:'center'}}>
                            <Text style={{
                                color: '#95999D'
                            }}>请登录</Text>
                        </View>
                    </View>
                    <View style={{flex:1, flexDirection:'row',marginTop:10}}>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                            <Image resizeMode="cover" style={{flex:1,width:25,height:25,marginBottom:5}} source={require('./assets/star.png')}/>
                            <Text style={{flex:1,color:'white',fontSize:12}}>收藏</Text></View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                            <Image resizeMode="cover" style={{flex:1,width:25,height:25,marginBottom:5}} source={require('./assets/message2.png')}/>
                            <Text style={{flex:1,color:'white',fontSize:12}}>消息</Text></View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                            <Image resizeMode="cover" style={{flex:1,width:25,height:25,marginBottom:5}} source={require('./assets/setting.png')}/>
                            <Text style={{flex:1,color:'white',fontSize:12}}>设置</Text></View>
                    </View>
                </View>
                <ScrollView style={{flex: 1}}>
                    <DrawerItems style={{flex:1}} {...props} />
                </ScrollView>
            </View>
        )
    },
});

let mainView = StackNavigator({
    Home: {screen: DashDrawerPage},
    // Dash: {screen: DashBoardView},
    Content: {screen: ContentView},
    Comment: {screen: CommentView}
},{
    // initialRouteName: 'DashDrawerPage',
    headerMode: 'none', //解决抽屉弹出有一个空白header的bug
});

module.exports = mainView;

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
        position: 'relative',
        alignItems: 'center',
        // backgroundColor: '#9DD6EB',
        height: 200,
    },
    slide1_img: {
        width: 100,
        backgroundColor: '#9DD6EB',
        height: 200
    },
    slide1_text: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'linear-gradient(180deg,transparent,rgba(0,0,0,.7))'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    icon: {
        width: 24,
        height: 24
    }
});
