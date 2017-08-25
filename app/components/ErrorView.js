import React,{Component} from 'react';
import {Text,Image} from 'react-native';
import {Container,Content,Button} from 'native-base';

export default class ErrorView extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <Container>
                <Content>
                    <Image source={require('../assets/error.png')} resizeMode="cover"/>
                    <Button >
                        <Text>加载失败，请点击重试...</Text>
                    </Button>
                </Content>
            </Container>
        )
    }

}
