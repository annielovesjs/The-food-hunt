import React from 'react';
import styles from './styles.module.css';

const Header = (props) => {
    return (
        <div className={styles.header}>
            <div id={styles.parent2}><h2 className={styles.title}>{props.title}</h2><div id="border2"></div></div>
            <div id={styles.parent}><p className={styles.sideNote}>{props.sideNote}</p><div id="border"></div></div>
        </div>
    )
}

export default Header;