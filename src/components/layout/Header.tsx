import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logout } from '../../store/slices/authSlice';
import Button from '../common/Button';

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary-600">
          MoviePedia
        </Link>
        <nav>
          <ul className="flex items-center space-x-6">
            <li>
              <Link to="/movies" className="text-neutral-600 hover:text-primary-600">
                Movies
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <span className="text-neutral-600">Welcome, {user?.username}</span>
                </li>
                <li>
                  <Button onClick={handleLogout} variant="outline" size="sm">
                    Logout
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">
                    <Button variant="outline" size="sm">
                      Login
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link to="/register">
                    <Button variant="primary" size="sm">
                      Register
                    </Button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

