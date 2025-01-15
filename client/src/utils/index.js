export const checkTocken = () => {
  const token = localStorage.getItem('ADMIN_TOKEN');
  
  if (token) {
    return true;
  }else{

    return false;
  }
};