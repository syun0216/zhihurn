import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {ListView,RefreshControl,Text,StyleSheet,Dimensions,View,Image,TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import {ListItem,Body,Left,Right,Thumbnail,Button,Container} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../utils/Colors';
_winWidth = Dimensions.get('window').width;
_windHeight = Dimensions.get('window').height;
export default class CommonListView extends Component{
  static propTypes = {
    //  refreshable:React.PropTypes.bool,
    //  renderRow: React.PropTypes.func,
    //  renderSeparator: React.PropTypes.func,
    //  renderFooter: React.PropTypes.func,
    //  requestingFunc:React.PropTypes.func,
    //  data:React.PropTypes.object.isRequired,
     navigation:React.PropTypes.object.isRequired,
        // renderRow:React.PropTypes.func.isRequired
  };
  _refreshable = false;
  _isEnd = true;
  constructor(props){
    super(props);
    this._refreshable = props.refreshable == null ? false : props.refreshable;
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource:ds.cloneWithRows([])
    };
  }

  componentDidMount(){
    this.setState({
      dataSource:this.state.dataSource.cloneWithRows(this.props.data.stories)
    });
  }

//requests
  _onRefreshToRequestFirstPageData(){
    if(this.props.requestingFunc != null){
      this.props.requestingFunc();
    }
    else{
      return null;
    }
  }

//views
  render(){
    let refreshControl = this._refreshable ? <RefreshControl
            style={{backgroundColor: Colors.TRANSPARENT}}
            refreshing={this.state.refreshing}
            onRefresh={() => this._onRefreshToRequestFirstPageData()}
        /> : null;
      return (
        <ListView
            style={{backgroundColor: Colors.bgColor}}
          initialListSize={10}
          pageSize={5}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this._renderListItemView(rowData)}
          enableEmptySections={true}
          showsVerticalScrollIndicator={false}
          renderHeader={() => this._renderHeaderView()}
          renderSectionHeader={(sectionData,sectionID) => this._renderSectionHeaderView(sectionData,sectionID)}
          refreshControl={refreshControl}
        />
      )
  }

  _renderListItemView(rowData){
    // if(this.props.renderRow !== null){
    //   return this.props.renderRow(rowData);
    // }
    // return (
    //   <ListItem style={{paddingTop:10,paddingBottom:10}}
    //     onPress={() => this.props.navigation.navigate('Content',{id:rowData.id,title:rowData.title})}>
    //     {rowData.images !== null ?
    //        <Thumbnail square size={50} source={{uri:rowData.images[0]}}></Thumbnail>
    //      : null}
    //       <Text style={{borderWidth:0,marginLeft:5}}>{rowData.title.split("").length > 18 ? rowData.title.substr(0,18) + '...' : rowData.title}</Text>
    //   </ListItem>
    // )

      // return (
      //     <TouchableOpacity transparent style={{height:70, borderBottomWidth:1, borderColor:'#ccc'}} onPress={() => this.props.navigation.navigate('Content',{id:rowData.id,title:rowData.title})}>
      //       <View style={{padding:10,flex:1,flexDirection:'row'}}>
      //           {rowData.images !== null ? <View style={{width:60}}><Image style={{width:50,height:50}} source={{uri:rowData.images[0]}}/></View> : null}
      //         <View style={{flex:1,justifyContent:'center'}}><Text style={{color:Colors.fontBlack}}>{rowData.title.split("").length > 18 ? rowData.title.substr(0, 18) + '...' : rowData.title}</Text></View>
      //       </View>
      //     </TouchableOpacity>
      // )

      return (
          <TouchableWithoutFeedback transparent style={{height: 70, flex: 1, padding: 10, justifyContent: 'center'}}
                                    onPress={() => this.props.navigation.navigate('Content', {
                                        id: rowData.id,
                                        title: rowData.title,
                                    })}>
            <View style={{
                backgroundColor: 'white',
                marginTop: 10,
                marginLeft: 10,
                marginRight: 10,
                padding: 10,
                flex: 1,
                flexDirection: 'row',
                borderRadius: 10,
                shadowColor: '#5b7392',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.15,
                shadowRadius: 2,
                elevation: 1,
            }}>
                  {rowData.images !== null ? <View style={{width:60}}><Image style={{width:50,height:50}} source={{uri:rowData.images[0]}}/></View> : null}
              <View style={{flex: 1, justifyContent: 'center'}}><Text
                  style={{color: Colors.fontBlack}}>{rowData.title.split("").length > 18 ? rowData.title.substr(0, 18) + '...' : rowData.title}</Text></View>
            </View>
          </TouchableWithoutFeedback>
      )
  }

  _renderHeaderView(){
    return (
      <View style={styles.titleImg}>
        <View style={{
            width: _winWidth,
            height: 200,
            position: 'absolute',
            backgroundColor: '#5b7492',
            opacity: 0.15,
            zIndex:1000
        }}></View>
        <Image style={{width:_winWidth,height:200}} source={{uri:this.props.data.image}}/>
        <View style={styles.titleView}>
          <Text style={[styles.titleText,{marginBottom:3}]}>{this.props.data.name}</Text>
          <Text style={styles.titleText}>{this.props.data.description}</Text>
        </View>
      </View>
    )
  }

  _renderSectionHeaderView(){
    return (
      <ListItem>
        <Left><Text>主编</Text>
          {
            this.props.data.editors.map((item,idx) => {
              return (
                <View key={`${idx}`} style={{marginLeft:20,marginTop:-3}}>
                    <Image style={{width:20,height:20,borderRadius:10}} source={{uri:item.avatar}} />
                </View>
              )
            })
          }
        </Left>
        <Body>
        </Body>
        <Right></Right>
      </ListItem>
    )
  }
}

const styles = StyleSheet.create({
  titleImg:{
    // flex: 1,
    // justifyContent: 'center',
    // position:'relative',
    // alignItems: 'center',
    width:_winWidth,
    // backgroundColor: '#9DD6EB',
    height: 200,
    position:'relative'
  },
  titleView:{
    position:'absolute',
    bottom:0,
    right:0,
    width:_winWidth,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:5,
      backgroundColor:"transparent"
  },
  titleText:{
      color: 'white',
      lineHeight: 30,
      fontWeight: 'bold',
      paddingBottom: 10,
      textShadowOffset: {width: 1, height: 2},
      textShadowColor: '#000',
      fontSize: 20,
      textAlign:'left'
  },
  editorView:{
    flex:1,
    justifyContent:"center",
    alignItems:'center',
    flexDirection:'row',
    borderBottomWidth:1,
    borderBottomColor:'#ccc',
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:5
    }
})
