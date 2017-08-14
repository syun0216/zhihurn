import React,{Component} from 'react';
import {View,Text,StyleSheet,Image,Dimensions} from 'react-native';
import {Header,Container,Content,Left,Body,Right,Button} from 'native-base';

export default class ThemeView extends Component{
  static navigationOptions = {
    header:null,
    drawerLabel: 'Notifications',
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
  }
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
}

const styles = StyleSheet.create({
  icon:{
    width:24,
    height:24
  }
});
