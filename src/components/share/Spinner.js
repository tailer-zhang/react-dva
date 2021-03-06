import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Spinner.less';

function Spinner({ loading }) {
  const svgCls = classnames({
    [styles.spinner]: true,
    [styles.show]: loading==true?true:false,
  });
  return (
    <div>
      <svg className={svgCls} width="260px" height="260px" viewBox="0 0 44 44">
        <circle className={styles.path} fill="none" strokeWidth="4" strokeLinecap="round" cx="22" cy="22" r="20" />
      </svg>
    </div>
  );
}

// Spinner.propTypes = {
//   loading: PropTypes.bool.isRequired,
// };

export default Spinner;

// <svg className={svgCls} width="44px" height="44px" viewBox="0 0 44 44">
//   <circle className={styles.path} fill="none" strokeWidth="4" strokeLinecap="round" cx="22" cy="22" r="20" />
// </svg>
