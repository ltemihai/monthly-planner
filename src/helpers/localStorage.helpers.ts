import { parseJson, stringifyJson } from "./json.helpers";

export const getLocalStorageValue = <T>(key: string): T => {
    const value = localStorage.getItem(key);
    return parseJson<T>(value!);
};

export const setLocalStorageValue = (key: string, value: string | object | boolean): void => {
    localStorage.setItem(key, typeof value === 'string' ? value : stringifyJson(value));
};

export const checkLocalStorageValue = (key: string): boolean => {
    return localStorage.getItem(key) !== null;
};