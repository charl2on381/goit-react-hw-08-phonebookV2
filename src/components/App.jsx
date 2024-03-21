import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { lazy, useEffect } from 'react';

import { Header } from './Header/Header';
import { PrivateRoute } from '../routes/PrivateRoute.jsx';
import { PublicRoute } from '../routes/PublicRoute.jsx';
import { userRefresh } from '../redux/auth/operations';
import { selectIsRefresh } from '../redux/auth/authSlice';
import Loader from './Loader/Loader';
import Notification from './Notification/Notification';

const Contacts = lazy(() => import('pages/Contacts'));
const Login = lazy(() => import('pages/Login'));
const Register = lazy(() => import('pages/Register'));

const App = () => {
  const isRefresh = useSelector(selectIsRefresh);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userRefresh());
  }, [dispatch]);
  return isRefresh ? (
    <div className="min-h-screen grid place-content-center">
      <Loader />
    </div>
  ) : (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route
          index
          element={
            <PrivateRoute>
              <Contacts />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
      </Route>
      <Route
        path="*"
        element={<Notification message="Oops, page not found" />}
      />
    </Routes>
  );
};

export default App;
