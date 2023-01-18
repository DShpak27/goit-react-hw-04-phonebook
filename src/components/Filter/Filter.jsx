import { useState } from 'react';
import propTypes from 'prop-types';
import { nanoid } from 'nanoid';
import styles from './Filter.module.scss';

function Filter({ onFilterChange }) {
    const [filter, setFilter] = useState(() => {
        return JSON.parse(window.localStorage.getItem('filter')) ?? '';
    });

    const filterInputId = nanoid();

    const getInputData = evt => {
        setFilter(evt.currentTarget.value);
        onFilterChange(evt.currentTarget.value);
    };

    return (
        <div className={styles.wrapper}>
            <label className={styles.label} htmlFor="filterInputId">
                Find contacts by name
            </label>
            <input
                id={filterInputId}
                type="text"
                name="filter"
                value={filter}
                onChange={getInputData}
            />
        </div>
    );
}

Filter.propTypes = {
    onFilterChange: propTypes.func.isRequired,
};

export default Filter;
