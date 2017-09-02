import React, {Component} from 'react';
import {View, Text, WebView, Dimensions, Image, StyleSheet} from 'react-native';
import {
    Container,
    Header,
    Content,
    Footer,
    Left,
    Body,
    Right,
    Button,
    Icon,
    Title,
    Badge
} from 'native-base';
import api from '../api/_index';
import FullLoadingScreen from '../components/FullScreenLoading';
import NewStatusBar from '../components/NewStatusBar';
import ErrorView from '../components/ErrorView';
import HTMLView from 'react-native-htmlview';
import CommonCss from '../components/CommonCss';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ToastUtil from '../utils/ToastUtil';

_winWidth = Dimensions.get('window').width;
_winHeight = Dimensions.get('window').height;
export default class ContentView extends Component {

    static navigationOptions = () => ({header: null, gesturesEnabled: true});
    // 构造
    _top = 0;

    constructor(props) {
        super(props);
        this._top = props.navigation.state.params.preRoute === 'DashBoard' ? -220 : 0;
        // 初始状态
        this.state = {
            isHttpRequesting: false,
            newsContent: null,
            favoriteChecked: false,
            commentsCount: 0,
            LoadStatus: true
        };
    }

    componentDidMount() {
        this.setState({isHttpRequesting: true});
        this._requestNewsContent(this.props.navigation.state.params.id);
        this._requestComments(this.props.navigation.state.params.id);
    }


    render() {
        return (
            <Container>
                <NewStatusBar networkVisible={this.state.isHttpRequesting} iosBgColor="white" borderBottom={1}/>
                {this.state.isHttpRequesting ? this._renderFullLoadingView() : null}
                {this.state.newsContent === null ?
                    null : this._renderMainContentView()}
                {this.state.LoadStatus ? null : this._renderErrorView()}
            </Container>
        )
    }

    _requestComments(id) {
        api.getCommentsById(id).then((data) => {
            if (data != null && data.data != null) {
                this.setState({
                    commentsCount: data.data.comments
                });
            }
            ;
            ToastUtil.show('加载成功', 1000, 'bottom');
        }).catch(() => {
            ToastUtil.show('api goes wrong', 1000);
            // console.log('api goes wrong');
        })
    }

    _requestNewsContent(id) {
        api.getNewsById(id).then((data) => {
            if (data.data != null) {
                let _html_class = data.data.image != null ? "html_content" : null;
                let _html = `<!DOCTYPE html>
                    <html>
                      <head>
                        <meta charset="utf-8">
                        <meta name="referrer" content="never">
                        <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,minimal-ui">
                        <!-- viewport 后面加上 minimal-ui 在safri 体现效果 -->
                        <meta name="apple-mobile-web-app-capable" content="yes">
                        <!-- 隐藏状态栏/设置状态栏颜色 -->
                        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
                        <!-- uc强制竖屏 -->
                        <meta name="screen-orientation" content="portrait">
                        <!-- UC强制全屏 -->
                        <meta name="full-screen" content="yes">
                        <!-- UC应用模式 -->
                        <meta name="browsermode" content="application">
                        <!-- QQ强制竖屏 -->
                        <meta name="x5-orientation" content="portrait">
                        <!-- QQ强制全屏 -->
                        <meta name="x5-fullscreen" content="true">
                        <!-- QQ应用模式 -->
                        <meta name="x5-page-mode" content="app">
                        <title>知乎日报</title>
                        <link rel="shortcut icon" href="static/favicon.ico">
                        <link href="${data.data.css[0]}" rel="stylesheet">
                        <style media="screen">
                          body{
                            margin:0;
                            padding:0;
                          }
                          ${CommonCss}
                        </style>
                      </head><body>
                      <div style="overflow-x:hidden">
                        <div class="img_div" style="background-image:url(${data.data.image})">
                          <h3>${data.data.title}</h3>
                          <span>图片&nbsp;&nbsp;:&nbsp;&nbsp;${data.data.image_source}</span>
                        </div>
                          <div class="${_html_class}" style="margin-top:${this._top}px;">
                            ${data.data.body}
                          </div>
                      </div>
                      </body>
                    </html>`;
                // let _html = `<div><p style="color:red">这是测试的html</p></div>`
                data.data.html = _html;
                this.setState({isHttpRequesting: false, newsContent: data.data});
                // console.log(this.state.newsContent);
            }
        }).catch((error) => {
            console.log('Api goes wrong');
            this.setState({isHttpRequesting: false, LoadStatus: false});
        });
    }

    _renderFullLoadingView() {
        return <FullLoadingScreen message="正在加载中..."/>
    }

    _renderErrorView() {
        return <ErrorView retry={() => {
            this._requestNewsContent();
            this._requestComments()
        }}/>;
    }

    _renderMainContentView() {
        const navigation = this.props.navigation;
        return (
            <Container>
                <Content>
                    <WebView bounces={false}
                             scalesPageToFit={true}
                             source={{html: this.state.newsContent.html}}
                             style={{width: _winWidth, height: _winHeight}}>
                    </WebView>
                    {/* <HTMLView value={this.state.newsContent.html}/> */}
                </Content>
                <Footer style={{backgroundColor: 'white'}}>
                    <Button transparent style={styles.bottomButton} onPress={() => this.props.navigation.goBack()}><Icon
                        name='arrow-back' style={{color: '#959595'}}/></Button>
                    <Button transparent style={styles.bottomButton}
                            onPress={() => this._toNextArticle()}><MaterialCommunityIcons name="chevron-double-down"
                                                                                          style={[styles.IconStyle, {fontSize: 22}]}/></Button>
                    <Button transparent style={styles.bottomButton}><MaterialCommunityIcons name="share-variant"
                                                                                            style={[styles.IconStyle, {fontSize: 18}]}/></Button>
                    <Button transparent style={styles.bottomButton} onPress={() => this.addNewsToFavorite()}>
                        {this.state.favoriteChecked ?
                            <MaterialIcons name='favorite' style={{fontSize: 20, color: '#ff5858'}}/> :
                            <MaterialIcons name="favorite-border" style={[styles.IconStyle, {fontSize: 20}]}/>}
                    </Button>

                    <Button transparent style={[styles.bottomButton, {position: 'relative'}]}
                            onPress={() => this.props.navigation.navigate('Comment', {
                                id: this.props.navigation.state.params.id,
                                count: this.state.commentsCount
                            })}>
                        <MaterialCommunityIcons name="comment-processing-outline"
                                                style={[styles.IconStyle, {fontSize: 18}]}/>
                        <Text style={[{
                            position: 'absolute',
                            top: 0,
                            color: '#ff5858'
                        }, this.state.commentsCount > 10 ? {right: 14} : {right: 20}]}>{this.state.commentsCount}</Text>
                    </Button>
                    {/* <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back'/>
            </Button>
          </Left>
          <Body>
            <Title>{navigation.state.params.title}</Title>
          </Body>
          <Right/> */}
                </Footer>
            </Container>
        );
    }

    //commonFunction
    _toNextArticle() {
        let list_item = this.props.navigation.state.params.list_data;
        let idx = Math.floor(Math.random() * list_item.length);
        this.setState({
            isHttpRequesting: true
        });
        this.setState({
            newsContent: null,
            commentsCount: 0
        });
        this._requestNewsContent(list_item[idx].id);
        this._requestComments(list_item[idx].id);
        // let nextId = null;
        // for(let idx in list_item){
        //   if(list_item[idx-1].id === currentId){
        // //     if(idx < list_item.length){
        // //       nextId = list_item[idx].id;
        // // //       this._requestNewsContent(list_item[idx+1].id);
        // // //       this._requestComments(list_item[idx+1].id);
        // // //       currentId=list_item[idx+1].id;
        // //     }
        // //     else{
        // //       ToastUtil.show('已经是最后一条了...',1000,'bottom');
        // //     }
        //   }
        // }
    }

    addNewsToFavorite() {
        if (!this.state.favoriteChecked) {
            this.setState({
                favoriteChecked: true
            });
            ToastUtil.show('收藏成功', 1000, 'top', 'success');
        }
        else {
            this.setState({
                favoriteChecked: false
            });
            ToastUtil.show('取消收藏', 1000, 'top', 'warning');
        }
    }

}
const styles = StyleSheet.create({
    bottomButton: {
        flex: 1,
        marginTop: 5
    },
    IconStyle: {
        color: "#959595",
        // fontSize:18
    }
});
