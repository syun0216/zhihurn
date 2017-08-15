import react,{Component} from 'react';
import {ListView,RefreshControl,Text} from 'react-native';
import {ListItem,Body,Left,Right,Thumbnail} from 'native-base';

export default class CommonListView extends Component{
  static propTypes = {
     refreshable:false,
    //  renderRow: React.PropTypes.func,
    //  renderSeparator: React.PropTypes.func,
    //  renderFooter: React.PropTypes.func,
     requestingFunc:React.propTypes.func,
     headerData:React.propTypes.string
  };
  _refreshable = false;
  _isEnd = true;
  constructor(props){
    super(props);
    this._refreshable = props.refreshable == null ? true : props.refreshable;
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource:ds.cloneWithRows([])
    };
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
          <Thumbnail square size={50} source={{uri:rowData.image[0]}}></Thumbnail>
          <Text style={{borderWidth:0}}>{rowData.title.split("").length > 18 ? rowData.title.substr(0,18) + '...' : rowData.title}</Text>
        </Left>
        <Body></Body>
        <Right></Right>
      </ListItem>
    )
  }

  _renderHeaderView(){

  }

}
