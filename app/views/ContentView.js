import React, {Component} from 'react';
import {View, Text,WebView,Dimensions,Image} from 'react-native';
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
  Title
} from 'native-base';
import api from '../api/_index';
import FullLoadingScreen from '../components/FullScreenLoading';
import HTMLView from 'react-native-htmlview';
import CommonCss from '../components/CommonCss';
_winWidth = Dimensions.get('window').width;
_winHeight = Dimensions.get('window').height;
export default class ContentView extends Component {

  static navigationOptions = () => ({header: null,gesturesEnabled:false});
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      isHttpRequesting: false,
      newsContent: null
    };
  }

  componentDidMount() {
    this.setState({isHttpRequesting: true});
    this._requestNewsContent();
  }

  render() {

    return this.state.newsContent === null
      ? this._renderFullLoadingView()
      : this._renderMainContentView();
  }

  _requestNewsContent() {
    api.getNewsById(this.props.navigation.state.params.id).then((data) => {
      if (data.data != null) {
        let _html_class = data.data.image != null ?"html_content" : null;
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
                          <div class="${_html_class}" style="margin-top:-220px;">
                            ${data.data.body}
                          </div>
                      </div>
                      </body>
                    </html>`;
        // let _html = `<div><p style="color:red">这是测试的html</p></div>`
        data.data.html = _html;
        this.setState({isHttpRequesting: false, newsContent: data.data});
        console.log(this.state.newsContent);
      }
    }).catch((error) => {
      console.log('Api goes wrong');
      this.setState({isHttpRequesting: false});
    });
  }

  _renderFullLoadingView() {
    return <FullLoadingScreen message="正在加载中..."/>
  }

  _renderMainContentView() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back'/>
            </Button>
          </Left>
          <Body>
            <Title>{navigation.state.params.title}</Title>
          </Body>
          <Right/>
        </Header>

        <Content>
          <WebView bounces={false}
                scalesPageToFit={true}
                source={{html:this.state.newsContent.html}}
                style={{width:_winWidth, height:_winHeight}}>
              </WebView>
          {/* <HTMLView value={this.state.newsContent.html}/> */}
        </Content>
      </Container>
    );
  }

}
