import React from 'react';
import Title from '../../components/product/Title';
import AddList from '../../components/product/AddList';


const AddContractNumber = () => {
  const TitleProps = {title:'追加合同号'};
  return(
    <div>
      <header style={{height: '1.733334rem',borderBottom: 'solid 1px #ddd',marginBottom: '0.28rem'}}><Title {...TitleProps}/></header>
      <AddList />
    </div>
  )
}

export default AddContractNumber;
