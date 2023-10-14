import { SetStateAction } from 'react';
import { AnyType } from './types';

export const upperCaseFirstLetter = (str: string) => {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
};

export const formatDate = (date: Date, options: Intl.DateTimeFormatOptions) => {
  return (
    `${new Date(date).toLocaleDateString('ru-Ru', options)}`
  );
};

export const onActionModal = (fn: (value: SetStateAction<boolean>) => void, data: AnyType) => {
  return fn(data);
};
