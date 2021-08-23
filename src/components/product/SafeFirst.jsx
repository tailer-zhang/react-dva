import React from 'react';
import styles from '../../styles/product/SafeFirst.less';


const SafeFirst = () => {
	return(
			<div  className={styles.total}>
				<header  className={styles.top}>
					<div className={styles.back}><img className={styles.img} src={require("../../image/icon/back_01.png")} />返回</div>
					<div className={styles.plan}>B类产品1</div>
				</header>
			</div>
		)
}

export default SafeFirst;
