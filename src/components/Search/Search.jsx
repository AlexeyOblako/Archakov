import React from 'react';
import style from './search.module.scss';
import debounce from 'lodash.debounce';
import krest from'../../assets/img/3669378_clear_ic_icon.svg'

const Search = ({setSearchValue}) => {

    const [value, setValue] = React.useState('');

    const updateSearchValue = React.useCallback(
        debounce(str => {
            setSearchValue(str);
        }, 700),
        [],
    );


    const onChangeInput = (event) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    };

    const onClickClear = () => {
        setSearchValue('');
        setValue('')
    }

    return (
        <div>
        <input
            value={value}
            onChange={onChangeInput}
               className={style.root}
               placeholder="Поиск пиццы..."/>
        {value &&
            <svg onClick={onClickClear} className={style.clear} height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"/><path d="M0 0h48v48H0z" fill="none"/></svg>
        }
    </div>
    );
};

export default Search;