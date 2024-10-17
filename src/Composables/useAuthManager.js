import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser,logoutUser } from '../Redux/authReducer';
import lodash from 'lodash';
import { useNavigate } from 'react-router-dom';

export default function useAuthManager() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth);


  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {

      const userInfo = JSON.parse(localStorage.getItem('userInfo'));

      dispatch({ type: 'loginSuccess', payload: userInfo });
    } else {
      dispatch(logoutUser()); 
    }
  }, [dispatch]);

  const loginWithCredentials = async (userData) => {
  

    try {
      const result =  dispatch(loginUser(userData)); 
      if (result.payload) {
        localStorage.setItem('userInfo', JSON.stringify(result));

      }
    } catch (error) {
      console.error('Login failed:', error);
    }

    return result
  };

  const logout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('userInfo');
  };

  const getEmail = () => lodash.get(auth, 'user.email', null);
  const getUserId = () => lodash.get(auth, 'user.id', null);
  const getUserName = () => lodash.get(auth, 'user.username', null);
  const getUserType = () => lodash.get(auth, 'user.ucUserType', null);

  return {
    loginWithCredentials,
    logout,
    getEmail,
    getUserId,
    getUserName,
    getUserType
  };
}
