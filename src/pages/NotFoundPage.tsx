import { FC } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const NotFoundPage: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-6">Oops! Page not found</p>
        <Link to="/">
          <Button variant="primary" size="md">Go Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;