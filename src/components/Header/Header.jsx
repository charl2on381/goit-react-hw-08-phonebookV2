import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';

import { selectIsLoggedIn, selectUser } from '../../redux/auth/authSlice';
import { userLogout } from '../../redux/auth/operations';
import Filter from 'components/Filter/Filter';
import { Suspense } from 'react';
import Loader from 'components/Loader/Loader';

export const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  return (
    <div className="px-2 py-2">
      <nav className="appearance-none rounded-full nm-flat-gray-200 leading-5 px-8 py-4 flex-grow sm:w-full mb-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="text-gray-600 text-xl font-bold">Phonebook</div>

            {isLoggedIn && <Filter />}

            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <>
                  <span className="text-gray-600 text-xl font-bold">
                    {user.name}
                  </span>
                  <button
                    onClick={() => dispatch(userLogout())}
                    className="w-14 h-10 flex justify-center items-center rounded-full nm-convex-gray-200-xs hover:nm-inset-gray-200-xs hover:font-semibold text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className={({ isActive }) => {
                      return isActive
                        ? 'w-16 h-10 flex justify-center items-center rounded-full text-sm nm-inset-gray-200-xs font-semibold'
                        : 'w-16 h-10 flex justify-center items-center rounded-full nm-convex-gray-200-xs hover:nm-inset-gray-200-xs hover:font-semibold text-sm';
                    }}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className={({ isActive }) => {
                      return isActive
                        ? 'w-16 h-10 flex justify-center items-center rounded-full text-sm nm-inset-gray-200-xs font-semibold'
                        : 'w-16 h-10 flex justify-center items-center rounded-full nm-convex-gray-200-xs hover:nm-inset-gray-200-xs hover:font-semibold text-sm';
                    }}
                  >
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};
