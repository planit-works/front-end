export const setLocalStorage = (key: string, item: any) => {
  if (typeof item === 'object') {
    localStorage.setItem(key, JSON.stringify(item));
  } else {
    localStorage.setItem(key, item);
  }
};

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const getLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};
