import { ChangeEvent, useState } from 'react';
import './Search.scss';

export interface SearchProps {
  className?: string;
}

export function Search({ className }: SearchProps) {
  const [inputValue, setInputValue] = useState('');

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(() => e.target.value);
  };

  return (
    <div className={`Search ${className}`}>
      <input
        type="text"
        id="Search__input"
        className="Search__input input"
        placeholder="Search"
        value={inputValue}
        onChange={onChangeInputHandler}
      />
    </div>
  );
}
