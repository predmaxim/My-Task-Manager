import { ChangeEvent } from 'react';
import { ButtonWithIcon } from '@/components/button-with-iIcon';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import styles from './styles.module.scss';
import { setSearch } from '@/lib/features/search-slice';

export type SearchProps = {
  className?: string;
}

export function Search({ className }: SearchProps) {
  const dispatch = useAppDispatch();
  const query = useAppSelector((state) => state.search.query);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  const onClear = () => {
    dispatch(setSearch(''));
  };

  const activeClass = query ? 'active' : '';

  return (
    <div className={`${styles.Search} ${className} ${activeClass}`}>
      <input
        type="text"
        id="Search__input"
        className={`${styles.Search__input} input`}
        placeholder="Search"
        value={query}
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
