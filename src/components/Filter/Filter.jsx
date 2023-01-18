import { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { nanoid } from 'nanoid';
import styles from './Filter.module.scss';

function useLocalStorage(localStorageKeyName = 'data') {
    const [data, setData] = useState(() => {
        return (
            JSON.parse(window.localStorage.getItem(localStorageKeyName)) ?? ''
        );
    }); // деструктуруємо змінну та метод для її зміни, задаємо початкове значення для filter, тепер filter буде станом функціонального компоненту внутрі якого буде визвана функція useLocalStorage

    useEffect(() => {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
        // eslint-disable-next-line
    }, [data]);

    return [data, setData];
}

function Filter({ onFilterChange }) {
    const [filter, setFilter] = useLocalStorage('filter');

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
