import React from 'react';
import { Tool } from '../../../../utils/tools';
import * as commonUtil from '../../../../utils/commonUtil';
import Title from '../../../../components/product/Title';
function getStrLeng(str){
  var realLength = 0;
  var len = str.length;
  var charCode = -1;
  for(var i = 0; i < len; i++){
    charCode = str.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128) {
      realLength += 1;
    }else{
      // 如果是中文则长度加2
      realLength += 2;
    }
  }
  if(realLength > 18) {
    return str.substring(0, 9) + '...'
  }
  return str;
}
export default class PlayAndroidVideo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { location } = this.props
    const path = location.state.path
    return (
      <div>
        <Title title={getStrLeng(location.state.name)} />
        <section>
          <video autoPlay controls id="video" width={document.body.clientWidth}>
            <source src={Tool.getSecretFilePath(commonUtil.ImageHostAddress + path)} />
          </video>
        </section>
      </div>
    )
  }
}
