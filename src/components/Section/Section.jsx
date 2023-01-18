import propTypes from 'prop-types';
import React from 'react';
import styles from './Section.module.scss';

function Section({ title, children }) {
    return (
        <section className={styles.section}>
            <h2 className={styles.title}>{title}</h2>
            {children}
        </section>
    );
}

Section.propTypes = {
    title: propTypes.string.isRequired,
    children: propTypes.any.isRequired,
};

export default Section;
