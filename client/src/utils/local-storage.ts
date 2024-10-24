import {GlobalStateType} from '@/types';

export function applyToLocalStorage(key: string, data: GlobalStateType) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getFromLocalStorage(key: string) {
  return JSON.parse(localStorage.getItem(key) || '');
}

export const LS_KEYS = {
  globalState: 'globalState',
};
