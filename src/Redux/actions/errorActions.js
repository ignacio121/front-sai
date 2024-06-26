export const handleError = (type, error, navigate) => (dispatch) => {
  if (error.response && (error.response.status === 401 || error.response.status === 403)) {
    localStorage.removeItem('token');
    navigate('/');
  }
  dispatch({ type: type, error });
};

export const isTokenExpired = () => {
  const expirationTime = localStorage.getItem('tokenExpiration');
  if (!expirationTime) return true;
  return new Date().getTime() > expirationTime;
};
