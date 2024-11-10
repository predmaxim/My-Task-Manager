import { ChangeEvent } from 'react';
import { ButtonWithIcon } from '@/components/button-with-iIcon';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import styles from './styles.module.scss';
import { setSearch } from '@/lib/features/search-slice';
import Input from '@/components/input';

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
      <Input
        label=""
        name="Search"
        type="text"
        id="Search__input"
        placeholder="Search"
        className={`${styles.Search__input} input`}
        value={query}
        onChange={onChangeHandler}
      />
      {query && <ButtonWithIcon
        className={styles.clearButton}
        onClick={onClear}
        icon="RiCloseLine"
      />}
    </div>
  );
}
