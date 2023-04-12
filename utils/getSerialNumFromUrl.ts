export const getSerialNumFromUrl = (url: string) => {
  return url.substring(0, url.indexOf('?'));
};
