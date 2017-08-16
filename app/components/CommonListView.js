import React,{Component} from 'react';
import {ListView,RefreshControl,Text,StyleSheet,Dimensions,View,Image} from 'react-native';
import {ListItem,Body,Left,Right,Thumbnail,Button,Container} from 'native-base';
_winWidth = Dimensions.get('window').width;
_windHeight = Dimensions.get('window').height;
export default class CommonListView extends Component{
  // static propTypes = {
  //    refreshable:React.PropTypes.bool,
  //   //  renderRow: React.PropTypes.func,
  //   //  renderSeparator: React.PropTypes.func,
  //   //  renderFooter: React.PropTypes.func,
  //    requestingFunc:React.PropTypes.func,
  //    data:React.PropTypes.object.isRequired,
  //    navigation:React.PropTypes.object.isRequired
  // };
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
        /> : null
      return (
        <ListView
          initialListSize={10}
          pageSize={5}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this._renderListItemView(rowData)}
          enableEmptySections={true}
          renderHeader={() => this._renderHeaderView()}
          renderSectionHeader={(sectionData,sectionID) => this._renderSectionHeaderView(sectionData,sectionID)}
          refreshControl={refreshControl}
        />
      )
  }

  _renderListItemView(rowData){
    return (
      <ListItem style={{paddingTop:10,paddingBottom:10}}
        onPress={() => this.props.navigation.navigate('Content',{id:rowData.id,title:rowData.title})}>
        <Left>
          {rowData.images !== null ? <Thumbnail square size={50} source={{uri:rowData.images[0]}}></Thumbnail> : null}
          <Text style={{borderWidth:0}}>{rowData.title.split("").length > 18 ? rowData.title.substr(0,18) + '...' : rowData.title}</Text>
        </Left>
        <Body>

        </Body>
        <Right></Right>
      </ListItem>
    )
  }

  _renderHeaderView(){
    return (
      <View style={styles.titleImg}>
        <Image style={{width:_winWidth,height:200}} source={{uri:this.props.data.image}}/>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>{this.props.data.name}</Text>
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
                <View key={`${idx}`} style={{marginLeft:5}}>
                    <Image style={{width:20,height:20,}} source={{uri:item.avatar}} />
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
    backgroundColor:'#000',
    opacity:0.6,
    width:_winWidth,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:5
  },
  titleText:{
    textAlign:'left',
    color:'white',
    fontSize:16
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
