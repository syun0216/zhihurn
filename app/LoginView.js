/**
 * Created by Syun on 2017/5/24.
 */
import React,{Component} from 'react'
import {StyleSheet} from 'react-native'
import { Container,Content,Form,Item,Input,Label,Button,Text,Toast,Header,Body,Left,Right,Icon} from 'native-base';
import api from './api/_index'
import NewStatusBar from './components/NewStatusBar';
import FullScreenLoading from './components/FullScreenLoading'
import UserStore from './store/UserStore'
import {NavigationActions} from 'react-navigation'
import Colors from './utils/Color';
import ToastUtil from './utils/ToastUtil';

export default class LoginView extends Component{
    static navigationOptions = () => ({
        title: "用户登录",
        headerBackTitle:null,
        headerStyle: {backgroundColor: Colors.main_red},
        headerTitleStyle: {color: "white"},
    });

    constructor(props){
        super(props);
        this.state = {
            phone:'',
            password:'',
            disabled:true,
            isLoading:false
        };
    }

    render(){
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}><Icon name='arrow-back' style={{fontSize:24,color:'#959595'}}/></Button>
                    </Left>
                    <Body><Text>用户登录</Text></Body>
                    <Right><Text style={{color:Colors.main_blue}}>注册</Text></Right>
                </Header>
                <NewStatusBar networkVisible={this.state.isLoading}/>
                {this.state.isLoading ? this._renderLoadingView() : this._renderLoginView()}
            </Container>
        )
    }

    _renderLoginView(){
        return (
            <Container>
                <Content>
                    <Form>
                        <Item fixedLabel>
                            <Label>手机号码</Label>
                            <Input onChangeText={(phone) => this._getPhone(phone)}
                                   multiline={false}
                                   autoFocus={false}
                                   placeholder='请输入手机号'
                                   keyboardType='numeric'
                                   clearButtonMode='while-editing'
                                   placeholderTextColor='gray'
                                   maxLength={11}
                                   returnKeyType='done'/>
                        </Item>
                        <Item fixedLabel>
                            <Label>密码</Label>
                            <Input onChangeText={(password) => this._getPassword(password)}
                                   multiline={false}
                                   autoFocus={false}
                                   placeholder='请输入密码'
                                   clearButtonMode='while-editing'
                                   placeholderTextColor='gray'
                                   returnKeyType='done'
                                   secureTextEntry={true}/>
                        </Item>
                    </Form>
                    <Button style={{margin:20,backgroundColor:Colors.main_blue}} block  onPress={() => this._login()}>
                        <Text>登录</Text>
                    </Button>
                </Content>
            </Container>
        )
    }

    _renderLoadingView(){
        return <FullScreenLoading/>;
    }

    _getPhone(text){
        let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if (reg.test(text)) {
            this.setState({
                phone: text,
                disabled:false
            })
        }

    }

    _getPassword(text){
        this.setState({
            password:text
        })
    }

    _login(){
        if(this.state.phone === '' && this.state.password === ''){
            ToastUtil.show('请填写用户名或密码',1000,'bottom');
            return ;
        }
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Home'})
            ]
        });
        UserStore.setLoginUserJsonData(this.state.phone);
        // console.log(userData.account.id);
        this.props.navigation.dispatch(resetAction);

        // this.setState({isLoading:true});
        // api.login(this.state.phone,this.state.password).then((data) => {
        //     console.log(data);
        //     this.setState({isLoading:false});
        //     if(data.data.code !== 200){
        //         Toast.show({
        //             text: data.data.msg,
        //             position: 'bottom',
        //             buttonText: 'Okay'
        //         });
        //         return;
        //     }
        //     if(data.data !== null ){
        //         UserStore.setLoginUserJsonData(data);
        //         this.props.navigation.navigate('Home')
        //     }
        //
        // },() => {
        //     this.setState({isLoading:false});
        //     Toast.show({
        //         text: "登录失败",
        //         position: 'bottom',
        //         buttonText: 'Okay'
        //     });
        // })
    }
}

const Styles = StyleSheet.create({
    loginBtn:{
        padding:10,
    }
});