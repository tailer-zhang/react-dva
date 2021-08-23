import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import { ListView, Button, List, Checkbox, Flex } from 'antd-mobile';
import productListStyle from '../style/ProductListStyle.less';

const AgreeItem = Checkbox.AgreeItem;

function connectStateToprops({ formStorage }) {
  return { formStorage }
}

@connect(connectStateToprops)
class ProductList extends React.Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      ds: ds,
      isLoading: false,
      chooseArr: [],

    };
  }

  componentWillMount() {
    const { formValue } = this.props.formStorage
    const myarr = formValue.checkArr ? formValue.checkArr : []
    let arrs = []
    this.setState({
      chooseArr: arrs.concat(myarr),
    }, () => {
      this.props.dispatch({
        type: 'formStorage/fetchFormValue',
        payload: {
          localArr: this.state.chooseArr,
        },
      });
    })
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'formStorage/fetchFormValue',
      payload: {
        localArr: null,
      },
    });
  }

  onEndReached= () => {
    const { dispatch } = this.props;
    const { loadingMore, reach_bottom } = this.props.productCheckModel;
    if (loadingMore) {
      return;
    }
    if (reach_bottom) return
    dispatch({ type: 'ProductCheckModel/fetchList', payload: { loadingMore: true } });
  }


  choose = () => {
    const { location, dispatch } = this.props;
    const { formValue } = this.props.formStorage
    const arr = formValue.localArr ? formValue.localArr : formValue.checkArr ? formValue.checkArr : []
    const { mode, select, withOutGoBack } = location.state;
    if (mode === 'slelect') {
      if (select) {
        select(arr);
      }
      if (!withOutGoBack) {
        dispatch(routerRedux.goBack());
      }
    }
  }

  separator=(sectionID, rowID) => {
    return (
      <div key={`${sectionID}-${rowID}`} style={{ backgroundColor: '#efeff4', height: 10 }} />
    )
  }

  clickRow(value) {
    const { formValue } = this.props.formStorage
    const myarr = formValue.localArr
    const newArr = myarr.find((it) => {
      return it.prodId === value.prodId
    })
    if (newArr) {
      this.remove(value)
    } else {
      if(myarr&&myarr.length > 0&&myarr[0].mgrSysCode !== value.mgrSysCode){
        alert('该产品需单独提交申请')
        return
      }
      myarr.push(value)
      this.props.dispatch({
        type: 'formStorage/fetchFormValue',
        payload: {
          localArr: myarr,
        },
      });
    }
    console.log('click each checkbox to log the value ', myarr);
  }

  remove(value) {
    const { formValue } = this.props.formStorage
    const arr2 = formValue.localArr
    for (let i = 0; i < arr2.length; i ++) {
      if (value.prodId === arr2[i].prodId) {
        arr2.splice(i, 1)
      }
    }
    this.props.dispatch({
      type: 'formStorage/fetchFormValue',
      payload: {
        localArr: arr2,
      },
    });
  }

  row=(rowData, sectionID, rowID) => {
    const { formValue } = this.props.formStorage
    const arr1 = formValue.localArr
    return (
      <div
        key={rowID}
        className={productListStyle.list}
      >
        <div className={productListStyle.left}>
          <AgreeItem
            className={productListStyle.checkbox}
            checked={!!arr1.find((it) => {
              return it.prodId === rowData.prodId
            })}
            data-seed="logId"
            onChange={this.clickRow.bind(this, rowData)}>
            <div className={productListStyle.right} >
                <p className={productListStyle.title}>{rowData.prodName}</p>
              {/*<div className={productListStyle.tag}>*/}
                {/*A*/}
              {/*</div>*/}
              {/*<div className={productListStyle.mid}>*/}
                {/*<p>1000000000</p>*/}
                {/*<p>1000000000</p>*/}
              {/*</div>*/}
              {/*<div className={productListStyle.last}>*/}
                {/*<p>持有份额</p>*/}
                {/*<p>可用份额</p>*/}
              {/*</div>*/}
            </div>
          </AgreeItem>
        </div>

      </div>
    );
  }

  renderFooter= () => {
    const { reach_bottom } = this.props.productCheckModel;
    if (reach_bottom) {
      return (
        <div style={{ marginBottom: '42px' }}>没有更多了</div>
      )
    }
    return (
      <div style={{ marginBottom: '42px' }}>上拉加载更多</div>
    )
  }

  render() {
    return (
      <div className={productListStyle.container}>
        <ListView
          ref="lv"
          dataSource={this.state.ds.cloneWithRows(this.props.dataSource)}
          renderRow={this.row}
          renderSeparator={this.separator}
          className="am-list"
          style={{ height: document.body.clientHeight * 5 / 6, overflow: 'auto', width: '100%', overflowX: 'hidden' }}
          pageSize={10}
          scrollRenderAheadDistance={500}
          scrollEventThrottle={20}
          onScroll={() => {
            console.log('scroll');
          }}
          onEndReachedThreshold={1000}
          onEndReached={this.onEndReached}
          renderFooter={this.renderFooter}
        />
        <Button className={productListStyle.btn} activeStyle={false} onClick={this.choose}>确定</Button>
      </div>
    );
  }
}

export default connect()(ProductList);
