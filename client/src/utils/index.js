export const checkTocken = () => {
  return localStorage.getItem('TOKEN') ? true : false;
};
