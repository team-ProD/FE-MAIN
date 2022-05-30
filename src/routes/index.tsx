import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';

import { useDispatch, useSelector } from '@/stores';
import { loginUser } from '@/stores/auth';
import { protectedRoutes } from './protectedRoutes';
import { publicRoutes } from './publicRoutes';

// user는 임시로 설정했습니다.
export const AppRoutes = () => {
  const { isLogged } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    // TODO: 임시임
    dispatch(loginUser());
  }, [dispatch]);

  const routes = isLogged ? protectedRoutes : publicRoutes;

  const element = useRoutes(routes);

  return element;
};
