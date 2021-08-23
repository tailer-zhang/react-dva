import React from 'react';
import { connect } from 'dva';
import { Tabs, WhiteSpace, ListView, Button } from 'antd-mobile';
import Title from '../../../../../components/product/Title';
import { createForm } from 'rc-form';
import UploadFiles from '../../utils/UploadFiles'
import Form from '../../../../../utils/form';
import ItemDetailStyle from './itemDetail.less';
import Timeline from '../../utils/Timeline';
import ShowImage from '../ShowImage'
import Dic from '../../../../../utils/dictionary';
import {routerRedux} from "dva/router";
import {Toast} from "antd-mobile/lib/index";
import UploadListFiles from '../UploadListFiles'

const TabPane = Tabs.TabPane;
function connectProps({ ItemDetailModel, rebutSpace, formStorage, ChangeRejectModel }) {
  return { ItemDetailModel, rebutSpace, formStorage, ChangeRejectModel }
}

@connect(connectProps)
@createForm()
export default class ItemDetail extends React.Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      ds: ds,
      ifFixed: false,
      activeKey: '1',
      show: false,
      content: '修改',
      // makeChange: false,
    }
  }

  componentDidMount() {
    // this.refs.boxScroll.addEventListener('touchmove', this.touch);
    // this.refs.boxScroll.addEventListener('scroll', this.scroll);
  }

  componentWillUnmount() {
    // this.refs.boxScroll.removeEventListener('touchmove', this.touch);
    // this.refs.boxScroll.removeEventListener('scroll', this.scroll);
    const { dispatch } = this.props
    dispatch({
      type: 'ItemDetailModel/clearCache',
      payload: {
        searchDetail: {},
        rejectDetails: {},
        timeLineList: [],
      },
    });
  }

  onChange = (index) => {
    const scrollPart1 = window.document.getElementById('scrollPart');
    const scrollPartChild1 = scrollPart1.children;
    this.setState({
      activeKey: index,
    })
    this.refs.lv.scrollTo(0, scrollPartChild1[index - 1].offsetTop - 54)
  }

  getOptions() {
    const { dispatch, form, formStorage, location } = this.props
    const { formValue } = formStorage;
    const data = formValue.itemDetailData && formValue.itemDetailData.myData ? formValue.itemDetailData.myData : this.props.ItemDetailModel.searchDetail;
    const prodName = data.prodName ? data.prodName : '--'
    const prodCode = data.prodCode ? data.prodCode : '--'
    const custName = data.custName ? data.custName : '--'
    const cardNo = data.cardNo ? data.cardNo : '--'
    const tradCodeName = data.tradCodeName ? data.tradCodeName : '--'
    const remitDate = data.remitDate ? data.remitDate : '--'
    const reqAmt = data.reqAmt ? data.reqAmt : '--'
    const reqShr = data.reqShr ? data.reqShr : '--'
  /*  const videoPerson = data.videoPersonName ? data.videoPersonName : '--'*/
    const videoTime = data.videoTime ? data.videoTime : '--'
    const confStatName = data.confStatName ? data.confStatName : '--'
    return ({
      prodName: {
        valueType: 'selfSelect',
        desc: '产品名称',
        extra: prodName,
        arrow: 'empty',
      },
      prodCode: {
        valueType: 'selfSelect',
        desc: '产品代码',
        extra: prodCode,
        arrow: 'empty',
      },
      customerName: {
        valueType: 'selfSelect',
        desc: '客户名称',
        extra: custName,
        arrow: 'empty',
      },
      cardNumber: {
        valueType: 'selfSelect',
        desc: '银行卡号',
        extra: cardNo,
        arrow: 'empty',
      },
      tradeType: {
        valueType: 'selfSelect',
        desc: '交易类型',
        extra: tradCodeName,
        arrow: 'empty',
      },
      applyDate: {
        valueType: 'selfSelect',
        desc: '申请日期',
        extra: remitDate,
        arrow: 'empty',
      },
      applyAmount: {
        valueType: 'selfSelect',
        desc: '申请金额(元)',
        extra: reqAmt,
        arrow: 'empty',
      },
      applyPortion: {
        valueType: 'selfSelect',
        desc: '申请份额(份)',
        extra: reqShr,
        arrow: 'empty',
      },
    /*  acceptor: {
        valueType: 'selfSelect',
        desc: '受理人员',
        extra: videoPerson,
        arrow: 'empty',
      },*/
      recordDtate: {
        valueType: 'selfSelect',
        desc: '录像时间',
        extra: videoTime,
        arrow: 'empty',
      },
      recheckState: {
        valueType: 'selfSelect',
        desc: '复核状态',
        extra: confStatName,
        arrow: 'empty',
      },
    })
  }
  getOptions1() {
    const { dispatch, form, formStorage, location } = this.props
    const { formValue } = formStorage;
    const details = formValue.rejectData && formValue.rejectData.rejectData ? formValue.rejectData.rejectData : this.props.ItemDetailModel.rejectDetails
    const custName = details.custName ? details.custName : '--';
    const certType = details.certType ? Dic.fetchDicValue('operCertType', details.certType) : '--';
    const certNo = details.certNo ? details.certNo : '--';
    const saleOrg = details.saleOrgName ? details.saleOrgName : '--';
    const tradCode = details.tradCode ? Dic.fetchDicValue('convertType', details.tradCode) : '--';
    const tradDate = details.tradDate ? details.tradDate : '--';
    const videoTime = details.videoTime ? details.videoTime.substring(0, details.videoTime.length - 3) : '--';
  /*  const videoPerson = details.videoPersonName ? details.videoPersonName : '--';*/
   /* const acceptor = details.saleOrg === '001' ? {
      videoPerson: {
        valueType: 'selfSelect',
        title: '受理人员',
        desc: '受理人员',
        extra: videoPerson,
        arrow: 'empty',
      },
    } : null*/
    return ({
      custName: {
        valueType: 'selfSelect',
        desc: '客户名称',
        extra: custName,
        arrow: 'empty',
      },
      certType: {
        valueType: 'selfSelect',
        desc: '证件类型',
        extra: certType,
        arrow: 'empty',
      },
      certNo: {
        valueType: 'selfSelect',
        desc: '证件号码',
        extra: certNo,
        arrow: 'empty',
      },
      saleOrg: {
        valueType: 'selfSelect',
        desc: '销售机构',
        extra: saleOrg,
        arrow: 'empty',
      },
      tradCode: {
        valueType: 'selfSelect',
        desc: '转换类型',
        extra: tradCode,
        arrow: 'empty',
      },
      tradDate: {
        valueType: 'selfSelect',
        desc: '申请日期',
        extra: tradDate,
        arrow: 'empty',
      },
      videoTime: {
        valueType: 'selfSelect',
        desc: '录像时间',
        extra: videoTime,
        arrow: 'empty',
      },
     /* ...acceptor,*/
    })
  }

  plays(state) {
    const { dispatch, form, formStorage, location } = this.props
    const { formValue } = formStorage;
    const fileList = formValue.private && formValue.private.attachList ? formValue.private.attachList : [];
    const imageList = formValue.imageUpload && formValue.imageUpload.imageList ? formValue.imageUpload.imageList : [];
    const timeLineList = formValue.timeLineList && formValue.timeLineList.timeLineList ? formValue.timeLineList.timeLineList : [];
    const myData = formValue.itemDetailData && formValue.itemDetailData.myData ? formValue.itemDetailData.myData : this.props.ItemDetailModel.searchDetail;
    const rejectData = formValue.rejectData && formValue.rejectData.rejectData ? formValue.rejectData.rejectData : this.props.ItemDetailModel.rejectDetails;
    const myImageList = formValue.imageUpload && formValue.imageUpload.myImageList ? formValue.imageUpload.myImageList : imageList;
    const myFileList = formValue.private && formValue.private.myFileList ? formValue.private.myFileList : fileList;
    const myTimeLineList = formValue.timeLineList && formValue.timeLineList.myTimeLineList ? formValue.timeLineList.myTimeLineList : timeLineList;
    dispatch({
      type: 'formStorage/fetchFormValue',
      payload: form.getFieldsValue(),
    });
    dispatch({
      type: 'formStorage/fetchFormValue',
      payload: {
        itemDetailData: { myData },
      },
    });
    dispatch({
      type: 'formStorage/fetchFormValue',
      payload: {
        rejectData: { rejectData },
      },
    });
    dispatch({
      type: 'formStorage/fetchFormValue',
      payload: {
        imageUpload: { myImageList },
      },
    })
    dispatch({
      type: 'formStorage/fetchFormValue',
      payload: {
        private: { myFileList },
      },
    })
    dispatch({
      type: 'formStorage/fetchFormValue',
      payload: {
        timeLineList: { myTimeLineList },
      },
    })
  }

  scroll = (e) => {
    const scrollPart = window.document.getElementById('scrollPart');
    const scrollPartChild = scrollPart.children;
    const num = 1;
    // // const navHeight = 84;
    // // const _this = this;
    const scrollTop = e.target.scrollTop;
    if (scrollTop >= num) {
      this.setState({ ifFixed: true })
      // scrollPart.style.paddingTop = num +"px";
    } else {
      this.setState({ ifFixed: false })
      // scrollPart.style.paddingTop = "";
    }

    for (let i = 0; i < scrollPartChild.length; i++) {
      if (scrollTop >= (scrollPartChild[i].offsetTop - 54)) {
        this.setState({ activeKey: (i + 1).toString() })
      }
    }
  }

  abolish = () => {
    this.setState({ show: true })
  }

  change = () => {
    const { dispatch, form, formStorage, location } = this.props
    const { formValue } = formStorage;
    const details = formValue.rejectData && formValue.rejectData.rejectData ? formValue.rejectData.rejectData : this.props.ItemDetailModel.rejectDetails
    const source = this.props.location.state.source
    const myData = formValue.itemDetailData && formValue.itemDetailData.myData ? formValue.itemDetailData.myData : this.props.ItemDetailModel.searchDetail;
    const rejectData = formValue.rejectData && formValue.rejectData.rejectData ? formValue.rejectData.rejectData : this.props.ItemDetailModel.rejectDetails
    dispatch({
      type: 'formStorage/fetchFormValue',
      payload: form.getFieldsValue(),
    });
    dispatch({
      type: 'formStorage/fetchFormValue',
      payload: {
        itemDetailData: { myData },
      },
    });
    dispatch({
      type: 'formStorage/fetchFormValue',
      payload: {
        rejectData: { rejectData },
      },
    });
    this.props.dispatch(routerRedux.push({ pathname: '/itemDetailChange', state: { details: details, data: source} }))
  }

  showAlert = () => {
    return (
      <div className={ItemDetailStyle.showAlert}>
        <div className={ItemDetailStyle.info}>
          <p>提示</p>
          <p>确定作废该记录？</p>
          <div>
            <Button onClick={this.confirm}>确定</Button>
            <Button onClick={this.cancel}>取消</Button>
          </div>
        </div>
      </div>
    );
  }

  confirm = () => {
    this.setState({ show: false })
    const { dispatch, location } = this.props
    dispatch({
      type: 'ChangeRejectModel/abolish',
      payload: {
        params: { id: location.state.id },
        backMethod: (data) => {
          if (data && data.code === '00') {
            dispatch(routerRedux.push({ pathname: '/optionSuccess', state: { successTitle: '废除成功，请等待系统确认！', backTitle: '返回转换驳回列表',
                backMethord: () => {
                  dispatch(routerRedux.push('/roleChangeRejectCnt'));
                },
              } }));
          } else Toast.fail(data && data.message ? data.message : '废除失败!', 3);
        },
      },
    });
  }

  cancel = () => {
    this.setState({ show: false })
  }

  //new---
  row=(rowData, sectionID, rowID) => {
    // console.log(rowID)
    const { form, location, formStorage, dispatch } = this.props;
    const { formValue } = formStorage
    const fileList = formValue.private && formValue.private.attachList ? formValue.private.attachList : [];
    const imageList = formValue.imageUpload && formValue.imageUpload.imageList ? formValue.imageUpload.imageList : [];
    const timeLineList = formValue.timeLineList && formValue.timeLineList.timeLineList ? formValue.timeLineList.timeLineList : [];
    const myImageList = formValue.imageUpload && formValue.imageUpload.myImageList ? formValue.imageUpload.myImageList : imageList;
    const myFileList = formValue.private && formValue.private.myFileList ? formValue.private.myFileList : fileList;
    const myTimeLineList = formValue.timeLineList && formValue.timeLineList.myTimeLineList ? formValue.timeLineList.myTimeLineList : timeLineList;
    let title = '';
    let check;
    let ifshow = false;
    switch (location.state.origin) {
      case 'multi_rejectList':
        title = '转换申请详情';
        ifshow = true;
        check = this.getOptions1()
        break;
      case 'multi_searchList':
        title = '双录入详情';
        ifshow = false;
        check = this.getOptions()
        break;
      case 'inquiry_list':
        title = '转换申请详情';
        ifshow = false;
        check = this.getOptions1()
        break;
      default:
        return null;
    }
    return (
      <div ref="boxScroll" id='boxScroll'>
        <div id="container">
          <WhiteSpace />
          <div id="scrollPart" ref="scrollPart" style={{ backgroundColor: '#efeff4' }}>
            <Form options={check} form={form} formValue={formValue} dispatch={dispatch}
            />
            <div>
              <UploadFiles
                playVideo={this.plays.bind(this)}
                fileList={myFileList}
                dispatch={dispatch}
                from="detail" dataSource={location.state.source} />
              <div style={{ height: '100%', backgroundColor: '#efeff4', marginTop: 22 }}>
                <UploadListFiles imageList={myImageList} from="detail" touch={this.plays.bind(this)} />
              </div>
            </div>
            <Timeline timeLineList={myTimeLineList} />
          </div>
          <div className={ItemDetailStyle.footerStyle}></div>
        </div>
      </div>
    );
  }

  render() {
    const { location } = this.props;
    let title = '';
    let check;
    let ifshow = false;
    switch (location.state.origin) {
      case 'multi_rejectList':
        title = '转换申请详情';
        ifshow = true;
        check = this.getOptions1()
        break;
      case 'multi_searchList':
        title = '双录入详情';
        ifshow = false;
        check = this.getOptions()
        break;
      case 'inquiry_list':
        title = '转换申请详情';
        ifshow = false;
        check = this.getOptions1()
        break;
      default:
        return null;
    }
    return (
      <div className={ItemDetailStyle.changeBox}>
          <Title title={title} showBack={'yes'} />
          <Tabs
            defaultActiveKey="1"
            activeKey={this.state.activeKey}
            swipeable={false}
            animated={false}
            onChange={this.onChange}
            className={ItemDetailStyle.tabStyle}>
            <TabPane tab="客户信息" key="1" />
            <TabPane tab="资料信息" key="2" />
            <TabPane tab="操作流水" key="3" />
          </Tabs>
        <ListView
          ref="lv"
          dataSource={this.state.ds.cloneWithRows(['1'])}
          renderRow={this.row}
          renderSeparator={this.separator}
          className="am-list"
          style={{ height: ifshow ? document.body.clientHeight * 5 / 6 : document.body.clientHeight * 6  / 7}}
          // contentContainerStyle={{ width: document.body.clientWidth }}
          pageSize={1}
          // scrollRenderAheadDistance={20}
          // scrollEventThrottle={20}
          onScroll={this.scroll}
          // onEndReachedThreshold={10}
        />
        {this.state.show ? this.showAlert() : null}
        <div className={ifshow ? ItemDetailStyle.butt : null}>
          {ifshow ? <Button className={ItemDetailStyle.btn} activeStyle={false} onClick={this.abolish}>作废</Button> : null}
          {ifshow ? <Button className={ItemDetailStyle.btn1} activeStyle={false} onClick={this.change}>修改</Button> : null}
        </div>
      </div>
    )
  }
}

