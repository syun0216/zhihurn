import React, {Component} from 'react';
import {Text, View, Image,} from 'react-native';
import {Container, Header, Footer, Body, Content, Left, Right, Button, Icon} from 'native-base';
import api from '../api/_index';
import FullScreenLoading from '../components/FullScreenLoading';
import NewStatusBar from '../components/NewStatusBar';
import ErrorView from '../components/ErrorView';
import ToastUtil from '../utils/ToastUtil';
import Colors from '../utils/Colors';

export default class CommentView extends Component {
    static navigationOptions = () => ({header: null, gesturesEnabled: true});

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            longComments: null,
            shortComments: null,
            isShortCommentsShow: false
        };
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        });
        this._requestLongCommentsData();
        this._requestShortCommentsData();
    }

    //request function
    _requestShortCommentsData() {
        api.getShortComments(this.props.navigation.state.params.id).then((data) => {
            if (data.data !== null && data.data.comments.length !== 0) {
                this.setState({
                    shortComments: this.getLocalDate(data.data.comments),
                    isLoading: false
                });
                // console.log(this.state.shortComments);
            }
            ToastUtil.show('加载成功', 1000, 'bottom');
        }).catch(() => {
            ToastUtil.show('api goes wrong', 1000, 'bottom');
            this.setState({
                isLoading: false
            })
        });
    }

    _requestLongCommentsData() {
        api.getLongComments(this.props.navigation.state.params.id).then((data) => {
            // console.log(data);
            if (data.data !== null && data.data.comments.length !== 0) {
                this.setState({
                    longComments: this.getLocalDate(data.data.comments)
                })
            }
            ToastUtil.show('加载成功', 1000, 'bottom');
        }).catch(() => {
            ToastUtil.show('api goes wrong', 1000, 'bottom');
        });
    }

    //common function
    getLocalDate(ns) {
        ns.map((val) => {
            val.time = new Date(parseInt(val.time) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
        });
        return ns;
    }

    _onShowShortComments() {
        this.setState({
            isShortCommentsShow: !this.state.isShortCommentsShow
        })
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left></Left>
                    <Body><Text style={{
                        color: '#1e90ff',
                        fontSize: 18
                    }}>{this.props.navigation.state.params.count}条评论</Text></Body>
                    <Right></Right>
                </Header>
                <NewStatusBar networkVisible={this.state.isLoading}/>
                {this.state.isLoading ? this._renderFullLoadingView() : null}
                <Content>
                    {this.state.longComments !== null ? this._renderLongCommentView() : null}
                    {this.state.shortComments !== null ? this._renderShortCommentView() : null}
                </Content>
                <Footer style={{backgroundColor: '#fff',}}>
                    <Left><Button transparent onPress={() => this.props.navigation.goBack()}>
                        <Icon name='arrow-back'
                              style={{
                                  fontSize: 24,
                                  color: '#ccc'
                              }}/></Button></Left>
                    <Body></Body>
                    <Right></Right>
                </Footer>
            </Container>
        )
    }

    _renderLongCommentView() {
        return (
            <View>
                {this.state.longComments.map((item, idx) => {
                    return this._renderCommonCommentView(item, idx);
                })}
            </View>
        )

    }

    _renderShortCommentView() {
        return (
            <View>
                {this._renderCommonTitleView('短评')}
                {this.state.isShortCommentsShow ? this.state.shortComments.map((item, idx) => {
                    return this._renderCommonCommentView(item, idx);
                }) : null}
            </View>
        )
    }

    _renderCommonTitleView(name) {
        return (
            <Button style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                padding: 10,
                borderBottomWidth: 1,
                height: 30,
                backgroundColor: 'white',
                borderColor: '#ccc'
            }} transparent onPress={() => this._onShowShortComments()}>
                <Text style={{flex: 1, color: Colors.fontBlack}}>{name}</Text>
                <Image style={{width: 20, height: 20}} source={require('../assets/drop-down.png')}/>
            </Button>
        )
    }

    _renderCommonCommentView(data, key) {
        return (
            <View key={`${key}`} style={{
                flex: 1,
                padding: 10,
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderColor: '#ccc',
                backgroundColor: 'white'
            }}>
                <View style={{width: 50}}>
                    <Image style={{width: 34, height: 34, borderRadius: 20}} source={{uri: data.avatar}}/>
                </View>
                <View style={{flex: 1, paddingRight: 5, marginTop: 5}}>
                    <View style={{
                        height: 10,
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 10
                    }}>
                        <Text>{data.author}</Text>
                        <View style={{flexDirection: 'row'}}><Image style={{width: 23, height: 23}}
                                                                    source={require('../assets/like_selected.png')}/>
                            <Text style={{marginTop: 4, marginLeft: 5}}>{data.likes}</Text></View>
                    </View>
                    <View style={{flex: 1, marginBottom: 10}}><Text
                        style={{lineHeight: 20,}}>{data.content}</Text></View>
                    <View style={{height: 10, marginBottom: 10}}><Text style={{color: "#ccc"}}>{data.time}</Text></View>
                </View>
            </View>
        );
    }

    _renderFullLoadingView() {
        return <FullScreenLoading message="正在加载中..."/>
    }

}
