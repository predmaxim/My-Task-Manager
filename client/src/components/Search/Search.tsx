import {ChangeEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import {deleteSearch, setSearch} from 'store/reducers/searchReducer';
import {ThunkDispatchType} from 'utils/types';
import {ButtonWithIcon} from 'components/ButtonWithIcon';
import './Search.scss';

export type SearchProps = {
  className?: string;
}

export function Search({className}: SearchProps) {
  const dispatch: ThunkDispatchType = useDispatch();
  const [inputValue, setInputValue] = useState('');

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    dispatch(setSearch(e.target.value));
  };

  const onClear = () => {
    setInputValue('');
    dispatch(deleteSearch());
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
