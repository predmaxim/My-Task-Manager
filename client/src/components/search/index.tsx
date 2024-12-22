import {ChangeEvent, useState} from 'react';
import {deleteSearchAction, setSearchAction} from '@/store/reducers/search-reducer';
import {ButtonWithIcon} from '@/components/button-with-iIcon';
import {useAppDispatch} from '@/lib/store';
import styles from './styles.module.scss';

export type SearchProps = {
  className?: string;
}

export function Search({className}: SearchProps) {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState('');

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    dispatch(setSearchAction(e.target.value));
  };

  const onClear = () => {
    setInputValue('');
    dispatch(deleteSearchAction());
  };

  const activeClass = inputValue ? 'active' : '';

  return (
    <div className={`${styles.Search} ${className} ${activeClass}`}>
      <input
        type="text"
        id="Search__input"
        className={`${styles.Search__input} input`}
        placeholder="Search"
        value={inputValue}
        onChange={onChangeHandler}
      />
      <ButtonWithIcon
        className="close-btn"
        onClick={onClear}
        icon="RiCloseLine"
      />
    </div>
  );
}
