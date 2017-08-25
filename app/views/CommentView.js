import React,{Component} from 'react';
import {Text} from 'react-native';
import {Container,Header,Footer,Body,Content,Left,Right,Button,Icon} from 'native-base';
import api from '../api/_index';
import FullScreenLoading from '../components/FullScreenLoading';
import NewStatusBar from '../components/NewStatusBar';
export default class CommentView extends Component{
  static navigationOptions = () => ({header: null,gesturesEnabled:false});
  constructor(props){
    super(props);
    this.state = {
      isLoading:false,
      commentData:null
    };
  }
  componentDidMount(){

  }

  //request function
  _requestShortCommentsData(){
    api.getShortComments(this.props.navigation.state.params.id).then((data) => {
      console.log(data);
    })
  }

  _requestLongCommentsData(){
    api.getLongComments(this.props.navigation.state.params.id).then((data) => {
      console.log(data);
    })
  }

  //common function
  getLocalDate(ns){
        ns.map((val) => {
           val.time =  new Date(parseInt(val.time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
        });
        return ns;
  }

  render(){
    return (
      <Container>
        <Header>
          <Left><Button transparent onPress={() => this.props.navigation.goBack()}><Icon name='arrow-back' style={{fontSize:18,color:'#1e90ff'}}/></Button></Left>
          <Body><Text style={{color:'#1e90ff',fontSize:18}}>{this.props.navigation.state.params.count}条评论</Text></Body>
          <Right></Right>
        </Header>
        <NewStatusBar />
        <Content><Text>123</Text></Content>
        <Footer style={{backgroundColor:'#959595',}}>

        </Footer>
      </Container>
    )
  }

  _renderFullLoadingView(){
    return <FullScreenLoading message="正在加载中..." />
  }

}
