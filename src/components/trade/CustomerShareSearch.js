import React from 'react';
import { SearchBar } from 'antd-mobile';

const CustomerShareSearch = ({searchValue,searchEvent,clear}) => {
  return (
    <div>
      <SearchBar placeholder="客户名称/产品名称" defaultValue={searchValue} onSubmit={(value)=>{searchEvent(value);}} onClear={clear}/>
    </div>
  )
}

export default CustomerShareSearch;
