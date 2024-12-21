import {ChangeEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import {deleteSearchAction, setSearchAction} from '@/store/reducers/search-reducer';
import {ThunkDispatchType} from '@/utils/types';
import {ButtonWithIcon} from '@/components/button-with-iIcon';
import './styles.scss';

export type SearchProps = {
  className?: string;
}

export function Search({className}: SearchProps) {
  const dispatch: ThunkDispatchType = useDispatch();
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
    <div className={`Search ${className} ${activeClass}`}>
      <input
        type="text"
        id="Search__input"
        className="Search__input input"
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
