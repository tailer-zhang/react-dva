import React, { PropTypes } from 'react';
import ToBackBtn from './ToBackBtn';
import ProBasicInfo from './ProBasicInfo';
import { Tabs, WhiteSpace } from 'antd-mobile';
import EquityTrend2 from '../../components/product/EquityTrend2';
import proDetailStyles from '../../styles/product/ProductDetail.less';

const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

const DataTab = ({ tabData, navData }) =>{
  return (
       <div>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="7日年化" key="1">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '9.0666rem' }}>
              <EquityTrend2/>
            </div>
          </TabPane>
          <TabPane tab="万化收益" key="2">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '7.866667rem' }}>
              选项卡二内容
            </div>
          </TabPane>
        </Tabs>
        <WhiteSpace />
      </div>
    );
}

export default DataTab;
