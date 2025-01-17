export const checkTocken = () => {
  const token = localStorage.getItem('ADMIN_TOKEN');
  
  if (token) {
    return true;
  }else{

    return false;
  }
};


export const checkUserTocken = () => {
  const token = localStorage.getItem('USER_TOKEN');
  
  if (token) {
    return true;
  }else{

    return false;
  }
};