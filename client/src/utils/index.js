export const checkTocken = () => {
  const token = localStorage.getItem('TOKEN');
  
  if (token) {
    return true;
  }else{

    return false;
  }
};