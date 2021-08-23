import React from 'react';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import PublicApplyItem from './PublicApplyItem';
import PrivateApplyItem from './PrivateApplyItem';
import PrivateRejectItem from './PrivateRejectItem';
import PublicRejectItem from './PublicRejectItem';
import ApplyForRoleChangeItem from './ApplyForRoleChangeItem';

function connectStateToprops({ rebutSpace, formStorage, RejectModel }) {
  return { formStorage, rebutSpace, RejectModel }
}

@connect(connectStateToprops)
@createForm()
export default class ApplyCnt extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { location, formStorage, form, dispatch, RejectModel } = this.props;
    const { formValue } = formStorage
    const fileList = formValue.private && formValue.private.attachList ? formValue.private.attachList : []
    const imageList = formValue.imageUpload && formValue.imageUpload.imageList ? formValue.imageUpload.imageList : []
    switch (location.state.from) {
      case 'public':
        return (
          <PublicApplyItem dataSource={location.state.dataSource} fileList={fileList} form={form} dispatch={dispatch} formValue={formValue} />
        )
      case 'private':
        return (
          <PrivateApplyItem dataSource={location.state.dataSource} fileList={fileList} formValue={formValue} dispatch={dispatch} />
        )
      case '01':
        return (
          <PrivateRejectItem data={RejectModel} dispatch={dispatch} fileList={fileList} form={form} dispatch={dispatch} formValue={formValue} dataSource={location.state.dataSource} />
        )
      case '02':
        return (
          <PublicRejectItem data={RejectModel} dispatch={dispatch} fileList={fileList} form={form} dispatch={dispatch} formValue={formValue} />
        )
      case 'role_change':
        return (
          <ApplyForRoleChangeItem data={location.state.dataSource} dispatch={dispatch} fileList={fileList} imageList={imageList} form={form} formValue={formValue} formStorage={formStorage} />
        )
      default:
        return null;
    }
  }
}
